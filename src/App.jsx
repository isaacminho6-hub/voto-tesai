import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Auth from './Auth'
import './index.css'

export default function App() {
  const [cands, setCands] = useState([])
  const [votes, setVotes] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
  }, [])

  useEffect(() => { if (user) load() }, [user])

  async function load() {
    let { data: c } = await supabase.from('candidatos').select('*')
    let { data: v } = await supabase.from('votos').select('*')
    setCands(c || [])
    setVotes(v || [])
  }

  async function votar(id) {
    const { data: votoExistente } = await supabase
      .from('votos')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    if (votoExistente) {
      alert('Ya votaste.')
      return
    }

    await supabase.from('votos').insert({ candidato_id: id, user_id: user.id })
    load()
  }

  if (loading) return <div>Cargando...</div>
  if (!user) return <Auth />

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Copa Tesãi — Votación</h1>
      <button onClick={() => supabase.auth.signOut()} className="mb-4">Cerrar sesión</button>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {cands.map(c =>
          <div key={c.id} className='bg-slate-800 p-4 rounded-xl text-center'>
            <img src={'/' + c.foto} className='mx-auto h-32 mb-2' />
            <div className='font-semibold'>{c.nombre}</div>
            <button
              onClick={() => votar(c.id)}
              className='mt-2 px-4 py-2 bg-teal-500 rounded'
              disabled={votes.some(v => v.user_id === user.id)}
            >Votar</button>
          </div>
        )}
      </div>
      <h2 className='text-2xl font-bold mt-8'>Resultados</h2>
      {cands.map(c => {
        let cnt = votes.filter(v => v.candidato_id === c.id).length
        return <div key={c.id} className='my-2'>
          <div className='flex justify-between'>
            <span>{c.nombre}</span><span>{cnt}</span>
          </div>
          <div className='h-2 bg-slate-700'>
            <div className='h-2 bg-teal-500' style={{ width: `${cnt * 20}px` }}></div>
          </div>
        </div>
      })}
    </div>
  )
}