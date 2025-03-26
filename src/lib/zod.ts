import { object, string } from "zod";

export const signInSchema = object({
    email: string({ required_error: "Email is required."})
        .min(1, "Email is required.")
        .email("Invalid email address."),
    password: string({ required_error: "Password is required."})
        .min(1, "Password is required.")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters."),
})

export const signUpSchema = object({
    username: string({ required_error: "Username is required."})
        .min(1, "Username is required.")
        .max(20, "Username must be less than 20 characters."),
    email: string({ required_error: "Email is required."})
        .min(1, "Email is required.")
        .email("Invalid email address."),
    password: string({ required_error: "Password is required."})
        .min(1, "Password is required.")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters."),
    confirmPassword: string({ required_error: "Please confirm your password."})
        .min(1, "Please confirm your password.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})