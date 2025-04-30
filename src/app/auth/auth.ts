import { supabase } from "../../../supabase/config"

interface AuthProps {
    email: string
    password: string
}

export const auth = async ({ email, password }: AuthProps): Promise<boolean> => {
    try {
        if (!email.trim() || !password.trim()) {
            return false
        }

        const { data: dataUser, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error || !dataUser.user) {
            return false
        }

        return true
    } catch (error) {
        console.error('Erro ao autenticar: ', error)
        return false
    }
}