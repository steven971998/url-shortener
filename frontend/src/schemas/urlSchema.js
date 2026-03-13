import * as yup from "yup"

export const urlSchema = yup.object({

  originalUrl: yup
    .string()
    .url("Enter valid URL")
    .required("URL is required"),

  alias: yup
    .string()
    .matches(/^[a-zA-Z0-9_-]{3,20}$/, "Invalid alias format")
    .nullable(),

  expiresInDays: yup
    .number()
    .positive()
    .integer()
    .nullable()

})