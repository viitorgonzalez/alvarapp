'use client'

import { useState } from 'react'
import { Eye, EyeOff, User, UserMinus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { handleSignUpSubmit } from '@/utils/handleSignUpSubmit'

type SignUpOptions = 'Email' | 'Google'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState<null | { text: string; type: 'success' }>(null)
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})
  const [selectedOption, setSelectedOption] = useState<SignUpOptions>('Email')
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {message && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-xl shadow-lg text-white flex flex-col gap-2 transition-all duration-300 bg-green-500">
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="absolute top-2 right-2 text-white font-bold text-xl hover:text-gray-200">
            ×
          </button>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md border border-gray-300">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Criar Conta</h2>

        <div className="flex justify-center gap-6 mb-6">
          {(['Email', 'Google'] as SignUpOptions[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedOption(option)}
              className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition ${selectedOption === option ? 'border-blue-600 shadow-lg' : 'border-gray-300'}`}
            >
              {option === 'Email' ? <User size={40} className="text-gray-400" /> : <UserMinus size={40} className="text-blue-600" />}
            </button>
          ))}
        </div>

        <form className="space-y-6" onSubmit={(e) => handleSignUpSubmit(e, setLoading, setFieldErrors, router)}>
          {selectedOption === 'Email' ? (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`mt-1 block w-full px-4 py-2 border ${fieldErrors.name ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-800`}
                  placeholder="Seu nome completo"
                />
                {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`mt-1 block w-full px-4 py-2 border ${fieldErrors.email ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-800`}
                  placeholder="seuemail@exemplo.com"
                />
                {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800">Senha *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`mt-1 block w-full px-4 py-2 border ${fieldErrors.password ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-800`}
                  placeholder="Crie uma senha segura"
                />
                {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-800">Confirmar Senha *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirm-password"
                  name="confirm-password"
                  className={`mt-1 block w-full px-4 py-2 border ${fieldErrors['confirm-password'] ? 'border-red-500' : 'border-gray-400'} rounded-md text-gray-800`}
                  placeholder="Repita a senha"
                />
                {fieldErrors['confirm-password'] && <p className="text-red-500 text-sm mt-1">{fieldErrors['confirm-password']}</p>}
              </div>

              <div className="text-center">
                <button type="button" onClick={() => setShowPassword(prev => !prev)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-800">Você escolheu se cadastrar com Google.</p>
              <button
                type="button"
                onClick={() => alert('Cadastro com Google ainda não implementado')}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Confirmar
              </button>
            </div>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => router.push('/auth/sign-in')}
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  )
}
