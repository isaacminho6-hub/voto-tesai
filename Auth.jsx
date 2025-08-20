import { useState } from 'react'
import { supabase } from './supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAuth(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    let result
    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password })
    } else {
      result = await supabase.auth.signUp({ email, password })
    }
    if (result.error) setError(result.error.message)
    setLoading(false)
  }

  return (
    <form onSubmit={handleAuth} className="max-w-sm mx-auto mt-10 bg-slate-800 p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="mb-2 w-full p-2 rounded" required />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Contraseña" className="mb-2 w-full p-2 rounded" required />
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <button type="submit" className="w-full bg-teal-500 p-2 rounded" disabled={loading}>{isLogin ? 'Entrar' : 'Registrarse'}</button>
      <div className="mt-2 text-center">
        <button type="button" className="text-teal-400 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
        </button>
      </div>
    </form>
  )
}