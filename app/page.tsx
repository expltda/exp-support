"use client"
 
import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { BotIcon, AttachmentIcon, SendIcon, HelpCircleIcon, SettingsIcon, CreditCardIcon, UserIcon } from "@/components/icons"
import { Markdown } from "@/components/markdown"
import { SupportBanner } from "@/components/support-banner"
import { Footer } from "@/components/footer"

const supportOptions = [
  {
    id: 1,
    title: "Problemas Técnicos",
    description: "Aplicativo não funciona, não atualiza ou apresenta erros",
    icon: SettingsIcon,
    color: "bg-blue-500",
    message: "Estou com problemas técnicos no AppSpy. O aplicativo não está funcionando corretamente.",
    type: "SUPORTE TÉCNICO",
  },
  {
    id: 2,
    title: "Dúvidas Gerais",
    description: "Como usar o AppSpy, configurações e funcionalidades",
    icon: HelpCircleIcon,
    color: "bg-green-500",
    message: "Tenho dúvidas sobre como usar o AppSpy. Pode me ajudar com as funcionalidades?",
    type: "ATENDIMENTO",
  },
  {
    id: 3,
    title: "Pagamentos e Planos",
    description: "Questões sobre assinatura, reembolso e upgrade",
    icon: CreditCardIcon,
    color: "bg-purple-500",
    message: "Preciso de ajuda com questões relacionadas a pagamentos, planos ou reembolso.",
    type: "REEMBOLSO",
  },
]

export default function SupportPage() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } = useChat({
  onError: () => toast.error("Erro ao conectar com o suporte. Tente novamente."),
  initialMessages: [
      {
        id: "initial-message",
        role: "assistant",
        content: "Olá, sou Ana Lucia atendente do AppSpy Pro, como posso te ajudar hoje?",
      },
    ],
})

  const [files, setFiles] = useState<FileList | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      const validFiles = Array.from(selectedFiles).filter(
        (file) => file.type.startsWith("image/") || file.type.startsWith("text/"),
      )

      if (validFiles.length === selectedFiles.length) {
        const dataTransfer = new DataTransfer()
        validFiles.forEach((file) => dataTransfer.items.add(file))
        setFiles(dataTransfer.files)
      } else {
        toast.error("Apenas arquivos de imagem e texto são permitidos")
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

      return (
      <div className="min-h-screen bg-green-500 flex flex-col">
        <SupportBanner type={supportOptions[2].type} />

        {/* Chat Area */}
        <div className="flex-1 bg-green-500 px-4 pb-4">
          <div className="bg-white rounded-lg h-full flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[350px] max-h-[350px] overflow-auto">
              {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {message.role === "assistant" && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {message.id === "initial-message" ? (
                  <Image
                    src="/support.png"
                    alt="Ana Lucia"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                  ) : (
                  <Image
                    src="/support.png"
                    alt="Ana Lucia"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                  )}
                </div>
                )}
                <div
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === "user" ? "bg-gray-100 text-gray-900" : "bg-green-500 text-white"
                }`}
                >
                <Markdown>{message.content}</Markdown>
                </div>
                {message.role === "user" && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-white" />
                </div>
                )}
              </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center overflow-hidden">
                 <Image
                    src="/support.png"
                    alt="Ana Lucia"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="bg-green-500 rounded-lg px-4 py-3 text-white">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                </div>
              </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form
                onSubmit={(event) => {
                  const options = files ? { experimental_attachments: files } : {}
                  handleSubmit(event, options)
                  setFiles(null)
                }}
                className="flex gap-2"
              >
                <input
                  type="file"
                  multiple
                  accept="image/*,text/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="flex-1 flex items-center bg-gray-50 rounded-lg border border-gray-200 px-3 py-2">
                  <button type="button" onClick={handleUploadClick} className="text-gray-400 hover:text-gray-600 mr-2">
                    <AttachmentIcon className="w-5 h-5" />
                  </button>

                  <input
                    ref={inputRef}
                    className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() && !files}
                  className="bg-green-500 hover:bg-orange-600 disabled:bg-gray-300 text-white rounded-lg px-4 py-2 transition-colors"
                >
                  <SendIcon className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )

}
