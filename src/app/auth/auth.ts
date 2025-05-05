import { supabase } from "../../../supabase/config"

export const handleSignIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error('Erro de login:', error)
            return { success: false, error: error.message }
          }

        return { success: true, data }
    } catch (err) {
        console.error('Erro ao tentar logar:', err)
        return { success: false, error: 'Erro inesperado no login' }
    }
}

export const handleSignUp = async (email: string, password: string, confirmPassword: string) => {
    try {
        if (password !== confirmPassword) {
            console.error("Senhas diferentes")
            return false
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error('Erro:', error)
            return false
        }

        return { success: true, data }
    } catch (err) {
        console.error('Erro ao tentar cadastrar:', err)
        return false
    }
}

export const signOut = async () => {
  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Erro ao sair:', error)
  }
}
