import { API_BASE_URL } from '../config'

export const fetchProfile = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/profile?userId=${encodeURIComponent(userId || '')}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error('Unable to fetch user profile')
  }
  return response.json()
}

export const saveProfile = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Unable to save user profile')
  }
  return response.json()
}
