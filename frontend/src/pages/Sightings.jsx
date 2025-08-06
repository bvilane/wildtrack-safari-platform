import React, { useEffect, useState } from 'react'
import { getSightings } from '../api'
import SightingCard from '../components/SightingCard'

export default function Sightings() {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getSightings()
        setSightings(data)
      } catch (error) {
        console.error('Failed to fetch sightings:', error)
        setSightings([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  }

  const filtersStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  }

  const getFilterButtonStyle = (type) => ({
    padding: '0.6rem 1.2rem',
    border: '2px solid #3d7c4f',
    background: filter === type ? '#3d7c4f' : 'white',
    color: filter === type ? 'white' : '#3d7c4f',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  })

  const filteredSightings = sightings.filter(s => {
    if (filter === 'verified') return s.verified
    if (filter === 'pending') return !s.verified
    return true
  })

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '3rem' }}>🦁</div>
        <p>Loading wildlife sightings...</p>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3d7c4f',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '1rem auto'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ color: '#2c5530', fontSize: '2.5rem' }}>🌍 Wildlife Sightings</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Real-time wildlife tracking and observation data
        </p>
      </div>

      <div style={filtersStyle}>
        {['all', 'verified', 'pending'].map((type) => (
          <button
            key={type}
            style={getFilterButtonStyle(type)}
            onClick={() => setFilter(type)}
          >
            {type === 'all' && `All (${sightings.length})`}
            {type === 'verified' && `✅ Verified (${sightings.filter(s => s.verified).length})`}
            {type === 'pending' && `⏳ Pending (${sightings.filter(s => !s.verified).length})`}
          </button>
        ))}
      </div>

      {filteredSightings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <h3>No sightings found</h3>
          <p>
            {filter === 'all' 
              ? "No wildlife sightings available yet. Check back later!"
              : `No ${filter} sightings found. Try a different filter.`}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {filteredSightings.map(s => (
            <SightingCard key={s.id} data={s} />
          ))}
        </div>
      )}
    </div>
  )
}
