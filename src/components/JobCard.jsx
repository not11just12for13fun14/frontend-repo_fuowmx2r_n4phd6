export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-2xl p-5 hover:border-blue-500/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{job.title}</h3>
          <p className="text-blue-200/90">{job.company} • {job.location}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.tags?.slice(0,5).map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-200 border border-blue-500/20">{t}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => onApply(job)}
          className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm"
        >Apply</button>
      </div>
    </div>
  )
}
