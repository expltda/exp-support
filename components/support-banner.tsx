import { ShieldIcon } from "@/components/icons"

interface SupportBannerProps {
  type: string
  processNumber?: string
}

export function SupportBanner({ type }: SupportBannerProps) {
  return (
    <div className="bg-green-500 text-white">
      <div className="px-4 py-2 flex justify-between items-center text-sm">
        <span className="font-semibold">{type.toUpperCase()}</span>
      </div>

      <div className="bg-white text-gray-800 mx-4 mb-4 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <ShieldIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-600">CENTRAL DE SUPORTE</h2>
            <h3 className="text-lg font-bold text-gray-900">Programa de atendimento AppSpy</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
