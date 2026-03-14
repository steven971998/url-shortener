import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { urlSchema } from "../schemas/urlSchema";
import { createShortUrl } from "../services/urlService";
import useUrlStore from "../store/urlStore";
import toast from "react-hot-toast";
import appConfig from "@/config/appConfig";

export default function UrlForm() {
  const { setShortUrl } = useUrlStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(urlSchema),
  });

  const onSubmit = async (data) => {
    console.log(`Form submitted : ${data}`);
    try {
      const res = await createShortUrl(data);

      setShortUrl(res.shortUrl);

      toast.success("Short URL Created");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error(error.response?.data?.error || "Error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        maxLength={appConfig.MAX_URL_LENGTH_ALLOWED}
        placeholder="Enter URL"
        className="border p-2 w-full"
        {...register("originalUrl")}
      />

      {errors.originalUrl && <p>{errors.originalUrl.message}</p>}

      <input
        {...register("alias")}
        placeholder="Custom alias (optional)"
        className="border p-2 w-full"
      />

      {errors.alias && <p className="text-red-500">{errors.alias.message}</p>}

      <input
        type="number"
        min="1"
        max="365"
        {...register("expiresInDays")}
        placeholder="Expires in days (optional)"
        className="border p-2 w-full"
      />

      {errors.expiresInDays && (
        <p className="text-red-500">{errors.expiresInDays.message}</p>
      )}

      <button className="bg-black text-white px-4 py-2">Shorten URL</button>
    </form>
  );
}
