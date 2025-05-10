import { NextResponse } from 'next/server'
import { supabase } from '../../../../supabase/config'
import authErrorMessages from '@/utils/authErrorMessages.json'

export const POST = async (req: Request) => {
  try {
    const { name, email, password, confirmPassword } = await req.json()

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Senhas não coincidem' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`
      }
    })

    if (error) {
      const found = authErrorMessages.find(err => err.code === error.code || err.code === error.message)
      const message = found ? found.message : 'Erro ao cadastrar.'
      return NextResponse.json(
        { success: false, message: message },
        { status: 400 }
      )
    }
    return NextResponse.json({ success: true, data })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.error('Erro inesperado no cadastro:', err)
    return NextResponse.json(
      { success: false, message: 'Erro inesperado no cadastro' },
      { status: 500 }
    )
  }
}
