import { z } from "zod"

const signUpSchema = z.object({
    firstName: z.string().min(1, { message: "First Name Is Required " }),
    lastName: z.string().min(1, { message: "Last Name Is Required " }),
    email: z.string().min(1, { message: "Email Is Required " }).email(),
    passowrd: z.string().min(5, { message: "The password must not be less than 5 letters or 5 numbers" }).regex(/.*[!@#$%_(){}|;].*/, {
        message: "password should contain at least special character"
    }),
    confirmPassword: z.string().min(1, { message: "Confirm Password Is Required " })
}).refine(input => input.passowrd === input.confirmPassword, {
    message: "Password and password confirmation are not the same",
    path: ["confirmPassword"]
})
export default signUpSchema;