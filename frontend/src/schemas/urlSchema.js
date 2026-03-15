import appConfig from "@/config/appConfig"
import * as yup from "yup"

export const urlSchema = yup.object({

originalUrl: yup
    .string()
    .max(appConfig.MAX_URL_LENGTH_ALLOWED, `URL is too long (max ${appConfig.MAX_URL_LENGTH_ALLOWED} characters)`)
    .matches(
      /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/.*)?$/,
      "Enter valid URL"
    )
    .test(
      "no-private-urls",
      "Local or private network URLs are not allowed",
      (value) => {
        if (!value) return false

        try {
          const url = new URL(
            value.startsWith("http") ? value : `http://${value}`
          )

          const hostname = url.hostname

          const blockedHosts = [
            "localhost",
            "127.0.0.1"
          ]

          if (blockedHosts.includes(hostname)) return false

          if (
            hostname.startsWith("192.168.") ||
            hostname.startsWith("10.") ||
            hostname.startsWith("172.16.")
          ) {
            return false
          }

          return true

        } catch {
          return false
        }
      }
    )
    .required("URL is required"),

alias: yup
  .string()
  .transform((value, originalValue) =>
    originalValue === "" ? null : value
  )
  .notRequired()
  .min(3, "Alias must be at least 3 characters")
  .max(30, "Alias cannot exceed 30 characters")
  .matches(/^[a-zA-Z0-9_-]{3,20}$/, {
    message: "Invalid alias format",
    excludeEmptyString: true
  }),

expiresInDays: yup
  .number()
  .transform((value, originalValue) =>
    originalValue === "" ? null : value
  )
  .nullable()
  .positive("Expiry must be greater than 0")
  .integer("Expiry must be a whole number")
.max(365, "Expiry cannot exceed 365 days")
})