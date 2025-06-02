import { ShieldIcon } from "@/components/icons"

export function Footer() {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <ShieldIcon className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-600 text-sm">© Brasil - Todos os direitos reservados</span>
      </div>

      <div className="flex justify-center gap-8 text-sm text-gray-600">
        <button className="hover:text-gray-800 transition-colors">Portal de Transparência</button>
        <button className="hover:text-gray-800 transition-colors border-b-2 border-gray-400 pb-1">
          Central de Atendimento
        </button>
        <button className="hover:text-gray-800 transition-colors">Ouvidoria</button>
      </div>
    </div>
  )
}
