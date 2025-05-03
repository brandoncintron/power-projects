"use client";

import { LuGithub, LuGlobe, LuLink, LuLinkedin } from "react-icons/lu";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SocialLinksFieldsProps } from "@@/profile/edit/types/types";

export function SocialLinksFields({ form, isPending }: SocialLinksFieldsProps) {
  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="text-lg font-medium">Social Links</h3>

      {/* Github */}
      <FormField
        control={form.control}
        name="github"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <LuGithub className="mr-2 h-4 w-4" /> Github
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://github.com/username"
                disabled={isPending}
                type="url"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* LinkedIn */}
      <FormField
        control={form.control}
        name="linkedin"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <LuLinkedin className="mr-2 h-4 w-4" /> LinkedIn
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://linkedin.com/in/username"
                disabled={isPending}
                type="url"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Website */}
      <FormField
        control={form.control}
        name="website"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <LuGlobe className="mr-2 h-4 w-4" /> Website
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://yourwebsite.com"
                disabled={isPending}
                type="url"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Other Social */}
      <FormField
        control={form.control}
        name="otherSocial"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <LuLink className="mr-2 h-4 w-4" /> Other Link
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Link to another profile or social media"
                disabled={isPending}
                type="url"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
