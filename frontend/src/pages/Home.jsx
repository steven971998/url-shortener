import UrlForm from "../components/UrlForm"
import ShortUrlResult from "../components/ShortUrlResult"

export default function Home() {

  return (

    <div className="bg-[#0B1A33] min-h-[calc(100vh-64px)] flex items-center justify-center">

      <div className="max-w-xl w-full space-y-6 text-center px-6">

        <h1 className="text-5xl font-bold text-white">
          URL Shortener
        </h1>

        <p className="text-slate-300">
          Paste your long URL and get a short link instantly
        </p>

        <div className="bg-[#1E2B3F] border border-slate-700 rounded-xl p-6 shadow-lg">

          <UrlForm />

          <ShortUrlResult />

        </div>

      </div>

    </div>

  )
}