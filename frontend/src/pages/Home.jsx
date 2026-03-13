import UrlForm from "../components/UrlForm"
import ShortUrlResult from "../components/ShortUrlResult"

export default function Home() {

  return (

    <div className="max-w-xl mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-6">
        URL Shortener
      </h1>

      <UrlForm/>

      <ShortUrlResult/>

    </div>

  )

}