import { Link } from "react-router-dom"
import { LinkIcon} from "lucide-react"

export default function Navbar() {

  return (

    <nav className="w-full border-b bg-white">

      <div className="max-w-6xl mx-auto px-3 py-2 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center gap-2 text-xl font-bold">

          <LinkIcon size={22}/>
          Shortify

        </Link>


        {/* Menu */}

        <div className="flex items-center gap-6 text-sm">

          <Link to="/analytics/" className="hover:text-gray-600">
            Analytics
          </Link>

          {/* <a
            href="https://github.com"
            target="_blank"
            className="flex items-center gap-1 hover:text-gray-600"
          >
            <Github size={18}/>
            GitHub
          </a> */}

        </div>

      </div>

    </nav>

  )

}