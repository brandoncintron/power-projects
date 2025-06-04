"use client";

import { LuLoader } from "react-icons/lu";

import { login } from "@/actions/login";
import { DialogError } from "@/components/auth/DialogError";
import { useAuth } from "@/components/auth/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema, signInSchemaType } from "@/schema/authSchema";

const SignInForm = () => {
  const { form, formState, onSubmit } = useAuth<signInSchemaType>(
    signInSchema,
    {
      email: "",
      password: "",
    },
    login,
  );

  const { isPending, error } = formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <DialogError message={error} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  disabled={isPending}
                  placeholder="name@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  disabled={isPending}
                  placeholder="******"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="w-full">
          {isPending && <LuLoader className="mr-2 size-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
