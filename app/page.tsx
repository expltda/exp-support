"use client"
 
import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { BotIcon, AttachmentIcon, SendIcon, HelpCircleIcon, SettingsIcon, CreditCardIcon } from "@/components/icons"
import { Markdown } from "@/components/markdown"
import { MobileHeader } from "@/components/mobile-header"
import { ChatHeader } from "@/components/chat-header"
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
  const { messages, input, handleSubmit, handleInputChange, isLoading, append } = useChat({
  onError: () => toast.error("Erro ao conectar com o suporte. Tente novamente."),
})

  const [showChat, setShowChat] = useState(false)
  const [selectedOption, setSelectedOption] = useState<(typeof supportOptions)[0] | null>(null)
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

  const handleOptionClick = (option: (typeof supportOptions)[0]) => {
    setSelectedOption(option)
    setShowChat(true)
  }

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

  if (showChat && selectedOption) {
    return (
      <div className="min-h-screen bg-green-500 flex flex-col">
        <ChatHeader onBack={() => setShowChat(false)} title="Chat com Atendente - AppSpy" subtitle="Online agora" />
        <SupportBanner type={selectedOption.type} />

        {/* Chat Area */}
        <div className="flex-1 bg-green-500 px-4 pb-4">
          <div className="bg-white rounded-lg h-full flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                          src="/atendente-suporte-ti.webp"
                          alt="Ana Lucia"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <BotIcon className="w-4 h-4 text-white" />
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
                      <BotIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src="/atendente-suporte-ti.webp"
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader />

      {/* Header with Support Agent Image */}
      <div className="bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mb-6">
              <Image
                src="/atendente-suporte-ti.webp"
                alt="Atendente de Suporte"
                width={200}
                height={200}
                className="mx-auto rounded-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Olá! 👋 Precisa de ajuda?</h1>
            <p className="text-lg text-gray-600">
              Como posso ajudar você hoje? Nosso suporte está pronto para atender.
            </p>
          </div>
        </div>

        {/* Support Options */}
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleOptionClick(option)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{option.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <span>Clique para iniciar o atendimento</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suporte 24/7 Disponível</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre pronta para ajudar você com qualquer dúvida sobre o AppSpy. Escolha uma das
                opções acima para começar uma conversa personalizada.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
