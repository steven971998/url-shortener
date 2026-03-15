import useUrlStore from "../store/urlStore";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ShortUrlResult() {
  const { shortUrl } = useUrlStore();
  const navigate = useNavigate();

  if (!shortUrl) return null;

  const code = shortUrl.split("/").pop();

  return (
    <div className="mt-6 border border-gray-600 bg-[#0f1b2d] rounded-lg p-4 flex items-center shadow-md">
      {/* Short URL */}
      <p className="text-emerald-400 break-all font-medium flex-1 mr-4">
        {shortUrl}
      </p>

      {/* Buttons */}
      <div className="flex gap-3">
        <CopyToClipboard text={shortUrl}>
          <button
            onClick={() => toast.success("URL Copied")}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm transition
shadow-sm hover:shadow-[0_0_10px_rgba(16,185,129,0.35)]"
          >
            <Copy size={16} />
            Copy
          </button>
        </CopyToClipboard>

        <button
          onClick={() => navigate(`/analytics/${code}`)}
          className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-md text-sm transition
  shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.6)]"
        >
          Show Analytics
        </button>
      </div>
    </div>
  );
}
