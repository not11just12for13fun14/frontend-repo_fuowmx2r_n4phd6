import { useState } from 'react'

export default function ApplyModal({ job, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [resumeUrl, setResumeUrl] = useState('')

  if (!job) return null

  const submit = (e) => {
    e.preventDefault()
    onSubmit({
      job_id: job.id,
      name,
      email,
      linkedin,
      cover_letter: coverLetter,
      resume_url: resumeUrl,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-blue-500/30 rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Apply to {job.title}</h3>
          <button onClick={onClose} className="text-blue-200 hover:text-white">✕</button>
        </div>

        <form className="space-y-3" onSubmit={submit}>
          <input
            className="w-full bg-slate-800/60 border border-blue-500/30 rounded-xl px-3 py-2 text-white"
            placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required
          />
          <input
            type="email"
            className="w-full bg-slate-800/60 border border-blue-500/30 rounded-xl px-3 py-2 text-white"
            placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required
          />
          <input
            className="w-full bg-slate-800/60 border border-blue-500/30 rounded-xl px-3 py-2 text-white"
            placeholder="LinkedIn URL" value={linkedin} onChange={(e)=>setLinkedin(e.target.value)}
          />
          <input
            className="w-full bg-slate-800/60 border border-blue-500/30 rounded-xl px-3 py-2 text-white"
            placeholder="Resume URL" value={resumeUrl} onChange={(e)=>setResumeUrl(e.target.value)}
          />
          <textarea
            className="w-full min-h-[100px] bg-slate-800/60 border border-blue-500/30 rounded-xl px-3 py-2 text-white"
            placeholder="Cover letter" value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)}
          />

          <button className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold">Submit Application</button>
        </form>
      </div>
    </div>
  )
}
