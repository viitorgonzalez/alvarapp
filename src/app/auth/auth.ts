import { supabase } from "../../../supabase/config"

export const handleLogin = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            console.error('Erro de login:', error)
            return false
        }

        return { success: true, data}
    } catch (err) {
        console.error('Erro ao tentar autenticar:', err)
        return false
    }
}
