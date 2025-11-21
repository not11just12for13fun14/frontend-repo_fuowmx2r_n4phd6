import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/80 border-b border-blue-500/20">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-white font-semibold tracking-tight">Jobs Portal</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className={"px-3 py-1.5 rounded-lg "+(isActive('/')? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-500/20')}>Jobs</Link>
          <Link to="/companies" className={"px-3 py-1.5 rounded-lg "+(isActive('/companies')? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-500/20')}>Companies</Link>
          <Link to="/test" className={"px-3 py-1.5 rounded-lg "+(isActive('/test')? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white hover:bg-blue-500/20')}>Test</Link>
        </nav>
      </div>
    </div>
  )
}
