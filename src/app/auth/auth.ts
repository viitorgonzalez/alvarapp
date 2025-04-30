import { supabase } from "../../../supabase/config"

export const handleLogin = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Erro de login:', error)
            console.log(data)
            return { success: false, error: error.message }
        }

        console.log('Login bem-sucedido:', data.user)
        return { success: true, data}
    } catch (err) {
        console.error('Erro ao tentar autenticar:', err)
        return false
    }
}
