'use client'

import { useRouter } from "next/navigation"
import { signOut } from "../auth/auth"

export default function Dashboard() {
    const router = useRouter()
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            await signOut() 
            router.push('/auth/sign-in')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Topbar */}
            <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between rounded-b-3xl">
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Sair
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Bem-vindo de volta!</h2>

                {/* Grid Layout para Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card de Estatísticas */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Usuários Ativos</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-3xl font-bold text-blue-600">1,245</p>
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 4V2h4v2h-2a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5h-4a5 5 0 0 0-5 5H2a7 7 0 0 1 7-7h4z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card de Novos Registros */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Novos Registros</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-3xl font-bold text-green-600">320</p>
                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v8.6l3 3V12h5V4H12z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Card de Feedbacks */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Feedbacks</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-3xl font-bold text-yellow-600">89</p>
                            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16l4-4m0 0l-4-4m4 4H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section de Tabela ou Detalhes (Exemplo de área adicional) */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas Atividades</h3>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 px-4 text-sm text-gray-600">Data</th>
                                <th className="py-3 px-4 text-sm text-gray-600">Atividade</th>
                                <th className="py-3 px-4 text-sm text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3 px-4 text-sm text-gray-800">01/10/2025</td>
                                <td className="py-3 px-4 text-sm text-gray-800">Cadastro de usuário</td>
                                <td className="py-3 px-4 text-sm text-green-600">Concluído</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-sm text-gray-800">30/09/2025</td>
                                <td className="py-3 px-4 text-sm text-gray-800">Alteração de senha</td>
                                <td className="py-3 px-4 text-sm text-yellow-600">Pendente</td>
                            </tr>
                            <tr>
                                <td className="py-3 px-4 text-sm text-gray-800">29/09/2025</td>
                                <td className="py-3 px-4 text-sm text-gray-800">Relatório gerado</td>
                                <td className="py-3 px-4 text-sm text-green-600">Concluído</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
