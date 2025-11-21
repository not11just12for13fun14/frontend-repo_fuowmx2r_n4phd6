import { useEffect, useState } from 'react'

export default function Companies() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/companies`)
        if (!res.ok) throw new Error('Failed to load companies')
        const data = await res.json()
        setCompanies(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-white text-3xl font-bold">Companies</h1>

        {loading && <p className="text-blue-200 mt-6">Loading companies...</p>}
        {error && <p className="text-red-300 mt-6">{error}</p>}

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {companies.map((c)=> (
            <div key={c.id} className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3">
                {c.logo_url && <img src={c.logo_url} alt={c.name} className="w-12 h-12 rounded-lg object-cover" />}
                <div>
                  <h3 className="text-white font-semibold">{c.name}</h3>
                  <p className="text-blue-200/80 text-sm">{c.location || '—'}</p>
                </div>
              </div>
              {c.description && <p className="text-blue-200/80 mt-3 text-sm">{c.description}</p>}
              {c.website && <a href={c.website} target="_blank" className="inline-block mt-3 text-sm text-blue-300 hover:text-white underline">Visit website</a>}
            </div>
          ))}
        </div>

        {!loading && companies.length === 0 && !error && (
          <p className="text-blue-200/80 mt-6">No companies found.</p>
        )}
      </div>
    </div>
  )
}
