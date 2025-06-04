"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  languageOptions,
  PersonalInfoFieldsProps,
  pronounOptions,
} from "@@/profile/edit/types/types";

export function PersonalInfoFields({
  form,
  isPending,
  email,
}: PersonalInfoFieldsProps) {
  return (
    <>
      {/* Username Field */}
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Your display name"
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Registered Email (Read-only) */}
      <div className="space-y-2">
        <FormLabel className="text-sm font-medium">Registered Email</FormLabel>
        <Input
          type="email"
          value={email || "No email associated"}
          disabled
          readOnly
          className="bg-muted text-muted-foreground cursor-not-allowed"
        />
        <FormDescription>
          Your email address can&apos;t be changed.
        </FormDescription>
      </div>

      {/* Bio Field */}
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Tell others about yourself"
                disabled={isPending}
                rows={3}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Location Field */}
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="e.g., San Francisco, CA"
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pronouns Field (Select Dropdown) */}
      <FormField
        control={form.control}
        name="pronouns"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pronouns</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isPending}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your pronouns" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {pronounOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Preferred Language Field (Select Dropdown) */}
      <FormField
        control={form.control}
        name="preferredLanguage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Language</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isPending}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
