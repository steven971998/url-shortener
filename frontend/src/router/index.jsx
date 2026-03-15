import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Analytics from "../pages/Analytics"
import NotFound from "../pages/NotFound"

export default function AppRouter() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/analytics/" element={<Analytics />} />

      <Route path="/analytics/:code" element={<Analytics />} />

      <Route path="*" element={<NotFound />} />

    </Routes>

  )

}