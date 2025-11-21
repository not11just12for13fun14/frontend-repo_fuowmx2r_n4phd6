import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Companies from './pages/Companies'
import JobDetails from './pages/JobDetails'
import Navbar from './components/Navbar'
import './index.css'

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/test" element={<Layout><Test /></Layout>} />
        <Route path="/companies" element={<Layout><Companies /></Layout>} />
        <Route path="/jobs/:id" element={<Layout><JobDetails /></Layout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
