import { Button } from "@/components/ui/button"
import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";

const AccessButtons = () => {
    const { open } = useAuthDialog();

    return (
        <div>
            <button onClick={() => open("signin")} className="no-underline cursor-pointer">
                <span className="text-base mr-4">Sign In</span>
            </button>

            <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 cursor-pointer"
                onClick={() => open("signup")}
            >
                Get Started
            </Button>
        </div>
    )
}

export default AccessButtons;