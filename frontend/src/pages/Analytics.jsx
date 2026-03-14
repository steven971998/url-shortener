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
      <div className="text-center mt-20">
        Loading analytics...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center mt-20">
        No analytics found
      </div>
    )
  }

  const shortUrl = `${window.location.origin}/${data.shortCode}`

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto mt-16 space-y-6"
    >

      <h1 className="text-3xl font-bold text-center">
        URL Analytics
      </h1>

      {/* Original URL */}
      <div className="border p-4 rounded-lg">

        <p className="text-sm text-gray-500">Original URL</p>

        <p className="break-all">{data.originalUrl}</p>

      </div>

      {/* Short URL */}

      <div className="border p-4 rounded-lg flex justify-between items-center">

        <div>
          <p className="text-sm text-gray-500">Short URL</p>
          <p>{shortUrl}</p>
        </div>

        <CopyToClipboard text={shortUrl}>
          <button
            onClick={() => toast.success("Copied")}
            className="flex items-center gap-2 text-sm"
          >
            <Copy size={18} />
            Copy
          </button>
        </CopyToClipboard>

      </div>


      {/* Click Count */}

      <div className="border p-4 rounded-lg">

        <p className="text-sm text-gray-500">Total Clicks</p>

        <p className="text-2xl font-bold">
          {data.clicks}
        </p>

      </div>


      {/* Chart */}

      <AnalyticsCard data={data} />


      {/* Created */}

      <div className="text-sm text-gray-500">

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

  )

}