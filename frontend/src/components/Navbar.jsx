import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import useUrlStore from "../store/urlStore";

export default function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();
  const clearUrl = useUrlStore((state) => state.clearUrl);

  const handleHomeClick = () => {
    clearUrl(); // 👈 clears ShortUrlResult
    navigate("/", { state: { refresh: Date.now() } });
  };

  const isAnalyticsPage = location.pathname.startsWith("/analytics");

  return (
    <nav className="w-full border-b border-gray-700 bg-[#0b1a33]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}

        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 text-lg font-semibold text-white hover:text-emerald-400 transition"
        >
          <LinkIcon size={20} className="text-emerald-400" />
          Shortify
        </button>

        {/* Menu */}

        <div className="flex items-center gap-6 text-sm text-gray-300">
          {isAnalyticsPage ? (
            <Link
              to="/"
              onClick={handleHomeClick}
              className="hover:text-emerald-400 transition"
            >
              Home
            </Link>
          ) : (
            <Link to="/analytics" className="hover:text-emerald-400 transition">
              Analytics
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
