import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAnalytics } from "../services/urlService"
import AnalyticsCard from "../components/AnalyticsCard"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Copy } from "lucide-react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

export default function Analytics() {

  const { code } = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const res = await getAnalytics(code)
        setData(res)

      } catch (error) {

        if (error.response?.status === 404) {
          toast.error("URL not found")
        } else {
          toast.error("Failed to load analytics")
        }

      } finally {
        setLoading(false)
      }

    }

    fetchAnalytics()

  }, [code])


  if (loading) {
    return (
      <div className="text-center text-white mt-20">
        Loading analytics...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center text-white mt-20">
        No analytics found
      </div>
    )
  }

  const shortUrl = `${window.location.origin}/${data.shortCode}`

  return (

    <div className="bg-[#0B1A33] min-h-[calc(100vh-64px)] flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full space-y-6 px-6"
      >

        <h1 className="text-5xl font-bold text-white text-center">
          URL Analytics
        </h1>


        {/* Original URL */}

        <div className="bg-[#1E2B3F] border border-slate-700 rounded-xl p-6 shadow-lg">

          <p className="text-sm text-slate-400 mb-1">Original URL</p>

          <p className="text-white break-all">
            {data.originalUrl}
          </p>

        </div>


        {/* Short URL */}

        <div className="bg-[#1E2B3F] border border-slate-700 rounded-xl p-6 shadow-lg flex justify-between items-center">

          <div>
            <p className="text-sm text-slate-400 mb-1">Short URL</p>
            <p className="text-emerald-400 break-all">
              {shortUrl}
            </p>
          </div>

          <CopyToClipboard text={shortUrl}>
            <button
              onClick={() => toast.success("Copied")}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm transition shadow-sm hover:shadow-[0_0_10px_rgba(16,185,129,0.35)]"
            >
              <Copy size={16}/>
              Copy
            </button>
          </CopyToClipboard>

        </div>


        {/* Click Count */}

        <div className="bg-[#1E2B3F] border border-slate-700 rounded-xl p-6 shadow-lg">

          <p className="text-sm text-slate-400 mb-1">Total Clicks</p>

          <p className="text-3xl font-bold text-white">
            {data.clicks}
          </p>

        </div>


        {/* Chart */}

        {/* <AnalyticsCard data={data} /> */}


        {/* Dates */}

        <div className="text-sm text-slate-400 text-center">

          <p>
            Created: {new Date(data.createdAt).toLocaleString()}
          </p>

          {data.expiresAt && (
            <p>
              Expires: {new Date(data.expiresAt).toLocaleString()}
            </p>
          )}

        </div>

      </motion.div>

    </div>

  )

}

