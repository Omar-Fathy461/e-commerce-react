import { z } from "zod"

const logInSchema = z.object({
    email: z.string().min(1, { message: "Email Is Required " }).email(),
    passowrd: z.string().min(5, { message: "The password must not be less than 5 letters or 5 numbers" })
})
export default logInSchema;