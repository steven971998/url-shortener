import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { urlSchema } from "../schemas/urlSchema"
import { createShortUrl } from "../services/urlService"
import useUrlStore from "../store/urlStore"
import toast from "react-hot-toast"
import appConfig from "@/config/appConfig"

export default function UrlForm() {

  const { setShortUrl } = useUrlStore()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(urlSchema)
  })

  const onSubmit = async (data) => {
console.log('Submitted')
    try {

      const res = await createShortUrl(data)

      setShortUrl(res.shortUrl)

      toast.success("Short URL Created")

    } catch (error) {
      // debugger;

      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.")
      } else {
        toast.error(error.response?.data?.error || "Error occurred")
      }

    }

  }

  return (
    <>
    {/* <div><Toaster/></div> */}

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <input
        maxLength={appConfig.MAX_URL_LENGTH_ALLOWED}
        placeholder="Enter long URL"
        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
        {...register("originalUrl")}
      />

      {errors.originalUrl && (
        <p className="text-red-500 text-sm">{errors.originalUrl.message}</p>
      )}

      <input
        {...register("alias")}
        placeholder="Custom alias (optional)"
        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
      />

      {errors.alias && (
        <p className="text-red-500 text-sm">{errors.alias.message}</p>
      )}

      <input
        type="number"
        min="1"
        max="365"
        {...register("expiresInDays")}
        placeholder="Expires in days (optional)"
        className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
      />

      {errors.expiresInDays && (
        <p className="text-red-500 text-sm">{errors.expiresInDays.message}</p>
      )}

      <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
        Shorten URL
      </button>

    </form>
</>
  )

}