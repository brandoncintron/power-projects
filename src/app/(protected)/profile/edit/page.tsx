import { auth } from "@/auth";
import EditProfileForm from "./components/EditProfileForm";
import { HideLoading } from "@/components/HideLoading";

export default async function FetchSession() {
  const session = await auth();
  return (
    <>
      <EditProfileForm session={session} />
      
    </>
  );
}
