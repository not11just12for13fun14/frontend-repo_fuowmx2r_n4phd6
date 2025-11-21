import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import JobCard from './components/JobCard'
import ApplyModal from './components/ApplyModal'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applyJob, setApplyJob] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchJobs = async (query = '') => {
    try {
      setLoading(true)
      setError('')
      const url = new URL(`${baseUrl}/api/jobs`)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to load jobs')
      const data = await res.json()
      setJobs(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const submitApplication = async (payload) => {
    try {
      const res = await fetch(`${baseUrl}/api/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to submit application')
      alert('Application submitted!')
      setApplyJob(null)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />

      <div className="relative max-w-5xl mx-auto px-6 py-8">
        <Hero onSearch={fetchJobs} />

        {loading && (
          <p className="text-blue-200 text-center">Loading jobs...</p>
        )}
        {error && (
          <p className="text-red-300 text-center">{error}</p>
        )}

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onApply={(j)=>setApplyJob(j)} />
          ))}
        </div>

        {!loading && jobs.length === 0 && !error && (
          <p className="text-blue-200/80 text-center mt-8">No jobs found. Try another search.</p>
        )}
      </div>

      <ApplyModal
        job={applyJob}
        onClose={() => setApplyJob(null)}
        onSubmit={submitApplication}
      />
    </div>
  )
}

export default App
