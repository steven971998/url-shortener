import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AnalyticsSearch() {

  const [code, setCode] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!code.trim()) return

    navigate(`/analytics/${code}`)
  }

  return (

    <div className="bg-[#0B1A33] min-h-[calc(100vh-64px)] flex items-center justify-center">

      <div className="max-w-xl w-full text-center px-6">

        <h1 className="text-5xl font-bold text-white mb-6">
          Check URL Analytics
        </h1>

        <div className="bg-[#1E2B3F] border border-slate-700 rounded-xl p-6 shadow-lg">

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Enter short code (e.g. IWPVkG)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-[#0f1b2d] border border-slate-600 rounded-lg p-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-emerald-400"
            />

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-lg transition"
            >
              View Analytics
            </button>

          </form>

        </div>

      </div>

    </div>

  )
}