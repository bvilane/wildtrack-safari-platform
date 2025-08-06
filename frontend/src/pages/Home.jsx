import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getSightings, getApiHealth } from '../api'

export default function Home() {
  const [sightingsCount, setSightingsCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('Loading...')
  const [recentSightings, setRecentSightings] = useState([])

  useEffect(() => {
    async function fetchData() {
      // Get API health
      const health = await getApiHealth()
      setApiStatus(health.status === 'OK' ? 'Online' : 'Offline')

      // Get sightings count
      const sightings = await getSightings()
      setSightingsCount(sightings.length)
      setRecentSightings(sightings.slice(0, 3)) // Latest 3
    }
    fetchData()
  }, [])

  const containerStyle = {
    padding: '2rem',
    textAlign: 'center'
  }

  const heroStyle = {
    background: 'linear-gradient(135deg, #2c5530 0%, #4a9960 100%)',
    color: 'white',
    padding: '4rem 2rem',
    borderRadius: '16px',
    marginBottom: '3rem',
    position: 'relative',
    overflow: 'hidden'
  }

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  }

  const statCardStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }

  const recentSightingsStyle = {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'left'
  }

  const ctaButtonStyle = {
    background: 'linear-gradient(135deg, #3d7c4f, #4a9960)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    display: 'inline-block',
    fontWeight: 'bold',
    marginTop: '2rem',
    transition: 'transform 0.2s ease'
  }

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          🦁 Welcome to the WildTrack Safari Experience
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Advanced Wildlife Sighting & Tracking System for Safari Lodges
        </p>
        <p style={{ fontSize: '1rem', opacity: 0.8 }}>
          Track real-time wildlife sightings, monitor animal behavior, and enhance your safari experience with professional-grade wildlife management tools.
        </p>
      </div>

      <div style={statsStyle}>
        <div style={statCardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ color: '#2c5530', margin: '0 0 0.5rem 0' }}>Total Sightings</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3d7c4f', margin: 0 }}>
            {sightingsCount}
          </p>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🖥️</div>
          <h3 style={{ color: '#2c5530', margin: '0 0 0.5rem 0' }}>System Status</h3>
          <p style={{ 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: apiStatus === 'Online' ? '#28a745' : '#dc3545',
            margin: 0 
          }}>
            ● {apiStatus}
          </p>
        </div>

        <div style={statCardStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌍</div>
          <h3 style={{ color: '#2c5530', margin: '0 0 0.5rem 0' }}>Coverage Area</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3d7c4f', margin: 0 }}>
            South Africa
          </p>
        </div>
      </div>

      {recentSightings.length > 0 && (
        <div style={recentSightingsStyle}>
          <h2 style={{ color: '#2c5530', marginBottom: '1.5rem' }}>🔥 Latest Wildlife Activity</h2>
          {recentSightings.map((sighting, index) => (
            <div key={sighting.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              <div style={{ fontSize: '2rem' }}>
                {sighting.species === 'African Lion' ? '🦁' :
                 sighting.species === 'African Elephant' ? '🐘' :
                 sighting.species === 'Cheetah' ? '🐆' : '🦌'}
              </div>
              <div style={{ flex: 1 }}>
                <strong>{sighting.species}</strong> sighted at{' '}
                <em>{typeof sighting.location === 'string' ? sighting.location : sighting.location?.name}</em>
                <br />
                <small style={{ color: '#666' }}>
                  {new Date(sighting.timestamp).toLocaleDateString()} by {sighting.observer}
                  {sighting.verified && <span style={{ color: '#28a745' }}> ✅</span>}
                </small>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link 
        to="/sightings" 
        style={ctaButtonStyle}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        🌍 View All Wildlife Sightings
      </Link>
    </div>
  )
}