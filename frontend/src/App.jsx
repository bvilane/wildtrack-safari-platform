import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Sightings from './pages/Sightings'

export default function App() {
  const location = useLocation()

  const navStyle = {
    background: 'linear-gradient(135deg, #2c5530 0%, #3d7c4f 100%)',
    padding: '1rem 2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '1rem'
  }

  const navContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const logoStyle = {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  }

  const getLinkStyle = (path) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: location.pathname === path ? 'rgba(255,255,255,0.2)' : 'transparent',
    border: location.pathname === path ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
    fontWeight: location.pathname === path ? 'bold' : 'normal'
  })

  const mainStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <nav style={navStyle}>
        <div style={navContainerStyle}>
          <Link to="/" style={logoStyle}>
            🦁 WildTrack Safari Platform
          </Link>
          <div style={navLinksStyle}>
            <Link 
              to="/" 
              style={getLinkStyle('/')}
              onMouseEnter={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/') {
                  e.target.style.backgroundColor = 'transparent'
                }
              }}
            >
              🏠 Home
            </Link>
            <Link 
              to="/sightings" 
              style={getLinkStyle('/sightings')}
              onMouseEnter={(e) => {
                if (location.pathname !== '/sightings') {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== '/sightings') {
                  e.target.style.backgroundColor = 'transparent'
                }
              }}
            >
              🌍 Wildlife Sightings
            </Link>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '0.3rem 0.8rem',
              borderRadius: '15px',
              fontSize: '0.8rem',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              🔴 Live
            </div>
          </div>
        </div>
      </nav>

      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sightings" element={<Sightings />} />
        </Routes>
      </main>

      <footer style={{
        background: '#2c5530',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        marginTop: '3rem'
      }}>
        <p>© 2025 WildTrack Safari Platform | Advanced DevOps Implementation</p>
      </footer>
    </div>
  )
}