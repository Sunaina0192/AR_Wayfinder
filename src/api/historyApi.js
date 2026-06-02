import { API_BASE_URL } from '../config'

export const fetchHistory = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/api/history?userId=${encodeURIComponent(userId || '')}`)
  if (!response.ok) {
    throw new Error('Unable to fetch navigation history')
  }
  return response.json()
}

export const saveHistoryItem = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/api/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Unable to save navigation history')
  }
  return response.json()
}
