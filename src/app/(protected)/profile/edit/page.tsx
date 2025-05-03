import { auth } from "@/auth";

import { HideLoading } from "@/components/HideLoading";

import EditProfileForm from "@@/profile/edit/components/EditProfileForm";

export default async function FetchSession() {
  const session = await auth();
  return (
    <>
      <EditProfileForm session={session} />
      <HideLoading />
    </>
  );
}
