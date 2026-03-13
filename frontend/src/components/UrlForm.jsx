import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { urlSchema } from "../schemas/urlSchema"
import { createShortUrl } from "../services/urlService"
import useUrlStore from "../store/urlStore"
import toast from "react-hot-toast"

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

    try {

      const res = await createShortUrl(data)
      
      setShortUrl(res.shortUrl)

      toast.success("Short URL Created")

    } catch (error) {

      if (error.response?.status === 429) {
        toast.error("Rate limit exceeded")
      }
      else {
        toast.error(error.response?.data?.error || "Error occurred")
      }

    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <input
        {...register("originalUrl")}
        placeholder="Enter URL"
        className="border p-2 w-full"
      />

      {errors.originalUrl && <p>{errors.originalUrl.message}</p>}

      <input
        {...register("alias")}
        placeholder="Custom alias (optional)"
        className="border p-2 w-full"
      />

      <input
        type="number"
        {...register("expiresInDays")}
        placeholder="Expires in days (optional)"
        className="border p-2 w-full"
      />

      <button className="bg-black text-white px-4 py-2">
        Shorten URL
      </button>

    </form>
  )
}