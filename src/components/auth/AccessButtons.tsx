import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";
import { Button } from "@/components/ui/button";

const AccessButtons = () => {
  const { open } = useAuthDialog();

  return (
    <div>
      <button onClick={() => open()} className="no-underline cursor-pointer">
        <span className="text-base mr-4">Sign In</span>
      </button>

      <Button
        className="font-medium px-4 py-3 cursor-pointer"
        onClick={() => open()}
      >
        Get Started
      </Button>
    </div>
  );
};

export default AccessButtons;
