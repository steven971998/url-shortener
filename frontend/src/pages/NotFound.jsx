import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {

  return (

    <div className="h-screen flex flex-col items-center justify-center text-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>

      <p className="text-gray-500 mt-2">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
      >
        <Home size={18}/>
        Go Home
      </Link>

    </div>

  )

}