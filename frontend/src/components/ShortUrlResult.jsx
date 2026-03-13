import useUrlStore from "../store/urlStore"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Copy } from "lucide-react"
import toast from "react-hot-toast"

export default function ShortUrlResult() {

  const { shortUrl } = useUrlStore()

  if (!shortUrl) return null

  return (

    <div className="mt-6">

      <p className="text-green-600">{shortUrl}</p>

      <CopyToClipboard text={shortUrl}>
        <button
          onClick={() => toast.success("Copied")}
          className="flex items-center gap-2"
        >
          <Copy size={18}/>
          Copy
        </button>
      </CopyToClipboard>

    </div>

  )

}