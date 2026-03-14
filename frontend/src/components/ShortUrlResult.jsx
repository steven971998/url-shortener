import useUrlStore from "../store/urlStore"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Copy } from "lucide-react"
import toast from "react-hot-toast"

export default function ShortUrlResult() {

  const { shortUrl } = useUrlStore()

  if (!shortUrl) return null

return (

  <div className="mt-6 border rounded-md p-4 bg-gray-50 flex justify-between items-center">

    <p className="text-green-600 break-all">{shortUrl}</p>

    <CopyToClipboard text={shortUrl}>
      <button
        onClick={() => toast.success("Copied")}
        className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded text-sm"
      >
        <Copy size={16}/>
        Copy
      </button>
    </CopyToClipboard>

  </div>

)

}