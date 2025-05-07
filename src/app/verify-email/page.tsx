export default function VerfifyEmail() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-300 text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Conta criada com sucesso!</h2>
                <p className="text-gray-700">
                    Um email de confirmação foi enviado para o endereço que você forneceu.
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                    Por favor, verifique sua caixa de entrada e siga as instruções para ativar sua conta.
                </p>

                <div className="mt-6">
                    <a
                        href="/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Voltar para login
                    </a>
                </div>
            </div>
        </div>
    )
}