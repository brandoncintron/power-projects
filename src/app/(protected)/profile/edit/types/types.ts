import type { Session } from "next-auth";
import type { EditProfileSchemaType } from "@/schema/profileSchema";

export interface ProfileFormProps {
  session: Session | null;
}

export interface ProfileFormData extends EditProfileSchemaType {}

export interface SelectOption {
  value: string;
  label: string;
}

export const pronounOptions: SelectOption[] = [
  { value: "he/him", label: "He/Him" },
  { value: "she/her", label: "She/Her" },
  { value: "they/them", label: "They/Them" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export const languageOptions: SelectOption[] = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
]; 