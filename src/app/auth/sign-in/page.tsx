'use client'

import { useState, useEffect } from 'react'
import { handleSignIn } from '../auth'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<null | { text: string, type: 'success' | 'error' }>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await handleSignIn(email, password)

    if (result.success) {
      setMessage({ text: 'Login realizado com sucesso!', type: 'success' })
      setLoading(false)
      router.push('/dashboard')
    } else {
      setMessage({ text: 'Login Falhou!', type: 'error' })
      setLoading(false)
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 9000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 relative">
      {message && (
        <div
          className={`absolute top-6 px-6 py-3 rounded-xl shadow-lg text-white flex items-center justify-between gap-4 transition-all duration-300 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="font-bold text-white">
            ×
          </button>
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 pr-10 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => router.push('/auth/sign-up')}
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  )
}
