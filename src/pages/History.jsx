import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, AlertCircle } from 'lucide-react'

const History = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setError(null)
        const response = await fetch('/api/history')
        if (!response.ok) {
          throw new Error('Failed to load history')
        }
        const data = await response.json()
        setHistory(data)
      } catch (err) {
        console.error(err)
        setError('Could not load history. Backend may be offline.')
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Navigation History</h1>
            <p className="text-slate-500 mt-2">Review your recent campus routes and open them again in Navigator.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent routes</h2>
              {error && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-800">{error}</p>
                    <p className="text-xs text-red-700 mt-1">Ensure the backend server is running: <code className="bg-red-100 px-1 rounded">npm run server</code></p>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                {loading ? (
                  <div className="rounded-3xl bg-slate-50 p-8 text-slate-600">Loading history…</div>
                ) : history.length > 0 ? (
                  history.map((record) => (
                    <button
                      key={`${record.id}-${record.createdAt}`}
                      onClick={() => navigate('/navigator', { state: { destination: record.destinationId } })}
                      className="w-full text-left rounded-3xl border border-slate-200 p-5 bg-slate-50 hover:bg-blue-50 transition"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{record.name}</p>
                          <p className="text-sm text-slate-500">Saved at {new Date(record.createdAt).toLocaleString()}</p>
                        </div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Open route</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="rounded-3xl bg-slate-50 p-8 text-slate-600">
                    <p className="text-base">No saved routes yet. Use Campus Navigator to start your first AR route.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Why history helps</h3>
              <p className="text-slate-600">Your route history saves destinations you’ve searched before so you can reopen the same campus navigation flow quickly.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Next step</h3>
              <p className="text-slate-600">Want more accuracy? The next update can add real GPS logging and campus check-in markers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default History
