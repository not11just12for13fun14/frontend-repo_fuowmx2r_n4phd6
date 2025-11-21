import { useState } from 'react'

export default function Hero({ onSearch }) {
  const [q, setQ] = useState('')
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Find your next job</h1>
      <p className="text-blue-200/80 mb-8">Search thousands of roles from top companies</p>
      <div className="max-w-2xl mx-auto flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title, company, or keyword"
          className="flex-1 bg-slate-900/60 border border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onSearch(q)}
          className="px-5 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          Search
        </button>
      </div>
    </div>
  )
}
