// Use environment variable or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

console.log('API Base URL:', BASE_URL)

export async function getSightings() {
  try {
    const res = await fetch(`${BASE_URL}/api/sightings`)
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }
    
    const data = await res.json()
    
    // Handle both direct array and { success: true, data: [...] } responses
    if (data.success && data.data) {
      return data.data
    } else if (Array.isArray(data)) {
      return data
    } else {
      console.warn('Unexpected API response format:', data)
      return []
    }
  } catch (err) {
    console.error("Failed to fetch sightings from API:", err.message)
    
    // Return mock data as fallback
    return [
      {
        id: 1,
        species: "African Lion",
        location: { name: "Waterhole Alpha", lat: -24.7761, lng: 25.8569 },
        timestamp: "2025-07-01T06:30:00.000Z",
        observer: "Guide John Msimanga",
        observerRole: "guide",
        notes: "Pride of 5 lions (2 adults, 3 cubs) drinking at waterhole. Lioness appeared protective of cubs.",
        weatherConditions: "Clear, 18°C",
        groupSize: 5,
        behavior: "drinking",
        verified: true
      },
      {
        id: 2,
        species: "African Elephant", 
        location: { name: "Marula Grove", lat: -24.785, lng: 25.865 },
        timestamp: "2025-07-01T15:45:00.000Z",
        observer: "Guest Sarah Wilson",
        observerRole: "guest",
        notes: "Large bull elephant feeding on marula fruits. Estimated age 40+ years.",
        weatherConditions: "Partly cloudy, 28°C",
        groupSize: 1,
        behavior: "feeding",
        verified: false
      }
    ]
  }
}

export async function getApiHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error("Health check failed:", err.message)
    return { status: 'ERROR', message: err.message }
  }
}