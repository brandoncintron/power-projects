"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/auth";
import { useState } from "react";

/**
 * Zod schema for sign-in form validation
 */
const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Type inferred from the Zod schema
type SigninFormData = z.infer<typeof signinSchema>;

/**
 * Sign In Component - Handles user authentication
 */
export default function SignInForm() {
  // Initialize form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  /**
   * Form submission handler
   */

  const onSubmit = async (data: SigninFormData) => {
    console.log('Form submitted with:', data);

  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Username field */}
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register("username")} />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      {/* Password field */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {/* Submit button */}
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
