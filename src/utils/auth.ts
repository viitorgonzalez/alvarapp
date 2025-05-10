'use client'

import { supabase } from "../../supabase/config"
import { AuthResponse } from "@/types/AuthResponse"

export const handleSignIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error(`[${new Date().toISOString()}] Erro de login:`, error)
      return { success: false, message: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Erro inesperado no login:`, err)
    return { success: false, message: 'Erro inesperado no login' }
  }
}

export const handleSignUp = async ({
  name,
  email,
  password,
  confirmPassword
}: {
  name: string
  email: string
  password: string
  confirmPassword: string
}) => {
  try {
    const response = await fetch('/api/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirmPassword })
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      return { success: false, message: errorResponse.message || 'Erro desconhecido ao tentar cadastrar.' }
    }

    const result = await response.json()
    return { success: true, result }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { success: false, message: 'Erro de rede ao tentar cadastrar.' }
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
