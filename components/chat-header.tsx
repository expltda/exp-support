"use client"

import { ArrowLeft, X, MoreVertical } from "lucide-react"

interface ChatHeaderProps {
  onBack: () => void
  title: string
  subtitle?: string
}

export function ChatHeader({ onBack, title, subtitle }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <X className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-medium text-gray-900 truncate max-w-[200px]">Central de Suporte</h1>
            <p className="text-sm text-gray-500">Atendimento Online</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-gray-800 transition-colors">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
