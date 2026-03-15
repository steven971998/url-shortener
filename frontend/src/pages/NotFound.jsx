import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {

  return (

    <div className="bg-[#0B1A33] min-h-[calc(100vh-64px)] flex items-center justify-center px-6">

      <div className="bg-[#1E2B3F] border border-slate-700 rounded-xl shadow-lg p-12 text-center max-w-md w-full">

<div className="flex flex-col items-center">

  <h1 className="text-7xl font-bold text-white">
    404
  </h1>

  <p className="text-xl text-slate-300 mt-2">
    Page not found
  </p>

  <p className="text-slate-400 max-w-xs leading-relaxed mt-4">
    The page you're looking for doesn't exist or may have been moved.
  </p>

  <Link
    to="/"
    className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-6 py-2 rounded-lg transition shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
  >
    <Home size={18}/>
    Go Home
  </Link>

</div>

        {/* <div className="flex flex-col items-center gap-6">

          <h1 className="text-7xl font-bold text-white">
            404
          </h1>

          <p className="text-xl text-slate-300">
            Page not found
          </p>

          <p className="text-slate-400 max-w-xs leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-6 py-2 rounded-lg transition shadow-sm hover:shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          >
            <Home size={18}/>
            Go Home
          </Link>

        </div> */}

      </div>

    </div>

  )

}