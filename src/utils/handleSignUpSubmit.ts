import { handleSignUp } from '@/app/auth/auth'
import { useRouter } from 'next/navigation'

export const handleSignUpSubmit = async (
  e: React.FormEvent,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setFieldErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
  router: ReturnType<typeof useRouter>
) => {
  e.preventDefault()
  const form = e.currentTarget as HTMLFormElement

  const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim()
  const email = (form.elements.namedItem('email') as HTMLInputElement)?.value.trim()
  const password = (form.elements.namedItem('password') as HTMLInputElement)?.value
  const confirmPassword = (form.elements.namedItem('confirm-password') as HTMLInputElement)?.value

  const newFieldErrors: { [key: string]: string } = {}

  if (!name) newFieldErrors.name = 'Nome é obrigatório.'
  if (!email) newFieldErrors.email = 'Email é obrigatório.'
  if (!password) newFieldErrors.password = 'Senha é obrigatória.'
  if (!confirmPassword) newFieldErrors['confirm-password'] = 'Confirmação de senha é obrigatória.'
  if (password && password.length < 6) newFieldErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
  if (password && confirmPassword && password !== confirmPassword) {
    newFieldErrors['confirm-password'] = 'As senhas não coincidem.'
  }

  if (Object.keys(newFieldErrors).length > 0) {
    setFieldErrors(newFieldErrors)
    return
  }
  setFieldErrors({})

  setLoading(true)

  const result = await handleSignUp({ name, email, password, confirmPassword })

  if (result.success) {
    router.push('/verify-email')
  } else {
    setFieldErrors({ email: result.message || 'Erro ao criar conta.' })
  }

  setLoading(false)
}
