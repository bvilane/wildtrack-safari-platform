import React from 'react'

export default function SightingCard({ data }) {
  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  }

  const speciesStyle = {
    color: '#2c5530',
    fontSize: '1.3rem',
    fontWeight: 'bold',
    margin: 0
  }

  const statusStyle = {
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    backgroundColor: data.verified ? '#d4edda' : '#fff3cd',
    color: data.verified ? '#155724' : '#856404',
    border: `1px solid ${data.verified ? '#c3e6cb' : '#ffeaa7'}`
  }

  const detailStyle = {
    margin: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem'
  }

  const labelStyle = {
    fontWeight: 'bold',
    color: '#555',
    minWidth: '80px'
  }

  const notesStyle = {
    backgroundColor: '#f8f9fa',
    padding: '0.8rem',
    borderRadius: '8px',
    borderLeft: '4px solid #3d7c4f',
    fontStyle: 'italic',
    color: '#666',
    marginTop: '1rem'
  }

  const coordinatesStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#999',
    fontFamily: 'monospace'
  }

  const locationName = typeof data.location === 'string' 
    ? data.location 
    : data.location?.name || 'Unknown Location'

  const coordinates = data.location?.lat && data.location?.lng
    ? `${data.location.lat}, ${data.location.lng}`
    : null

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <div style={headerStyle}>
        <div>
          <h3 style={speciesStyle}>{data.species}</h3>
          <p style={{ margin: '0.2rem 0', color: '#666', fontSize: '0.9rem' }}>
            📍 {locationName}
          </p>
        </div>
        <div style={statusStyle}>
          {data.verified ? '✅ Verified' : '⏳ Pending'}
        </div>
      </div>

      <div style={detailStyle}>
        <span style={labelStyle}>👤 Observer:</span>
        <span>{data.observer || 'Unknown'}</span>
        {data.observerRole && (
          <span style={{
            backgroundColor: '#e9ecef',
            padding: '0.1rem 0.4rem',
            borderRadius: '8px',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}>
            {data.observerRole}
          </span>
        )}
      </div>

      <div style={detailStyle}>
        <span style={labelStyle}>🗓️ Date:</span>
        <span>{new Date(data.timestamp).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</span>
      </div>

      {data.weatherConditions && (
        <div style={detailStyle}>
          <span style={labelStyle}>🌡️ Weather:</span>
          <span>{data.weatherConditions}</span>
        </div>
      )}

      {(data.groupSize || data.behavior) && (
        <div style={detailStyle}>
          {data.groupSize && (
            <>
              <span style={labelStyle}>👥 Group:</span>
              <span style={{ marginRight: '1rem' }}>{data.groupSize}</span>
            </>
          )}
          {data.behavior && (
            <>
              <span style={labelStyle}>🐾 Behavior:</span>
              <span style={{
                backgroundColor: '#f8f9fa',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                border: '1px solid #dee2e6',
                textTransform: 'capitalize'
              }}>
                {data.behavior}
              </span>
            </>
          )}
        </div>
      )}

      {data.notes && (
        <div style={notesStyle}>
          "{data.notes}"
        </div>
      )}

      {coordinates && (
        <div style={coordinatesStyle}>
          GPS: {coordinates}
        </div>
      )}
    </div>
  )
}
