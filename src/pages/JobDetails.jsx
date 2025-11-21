import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/jobs/${id}`)
        if (!res.ok) throw new Error('Failed to load job')
        const data = await res.json()
        setJob(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className="min-h-screen bg-slate-900 text-blue-200 p-8">Loading...</div>
  if (error) return <div className="min-h-screen bg-slate-900 text-red-300 p-8">{error}</div>
  if (!job) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      <div className="relative max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-white text-3xl font-bold">{job.title}</h1>
        <p className="text-blue-200/90 mt-1">{job.company} • {job.location} • {job.type}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.tags?.map((t)=> (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-200 border border-blue-500/20">{t}</span>
          ))}
        </div>
        { (job.salary_min || job.salary_max) && (
          <p className="text-blue-200/90 mt-3">Salary: {job.salary_min? `$${job.salary_min.toLocaleString()}`: ''} {job.salary_max? `- $${job.salary_max.toLocaleString()}`: ''}</p>
        )}
        {job.description && (
          <div className="prose prose-invert max-w-none mt-6">
            <p className="text-blue-200/90 whitespace-pre-wrap">{job.description}</p>
          </div>
        )}
        <a href={`/#apply-${job.id}`} className="inline-block mt-6 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white">Apply Now</a>
      </div>
    </div>
  )
}
