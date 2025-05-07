import { supabase } from "../../../supabase/config"

type AuthResponse = {
  success: boolean
  data?: unknown
  message?: string
}

export const handleSignIn = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error('Erro de login:', error)
      return { success: false, message: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Erro inesperado no login:', err)
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
}): Promise<AuthResponse> => {
  if (password !== confirmPassword) {
    console.warn("Senhas não coincidem")
    return { success: false, message: 'Senhas não coincidem' }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${window.location.origin}/confirm`
      }
    })

    if (error) {
      console.error('Erro no cadastro:', error)
      return { success: false, message: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Erro inesperado no cadastro:', err)
    return { success: false, message: 'Erro inesperado no cadastro' }
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
