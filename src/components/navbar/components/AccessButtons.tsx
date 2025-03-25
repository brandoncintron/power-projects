import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { useAuthDialog } from "@/hooks/useAuthDialog";

interface AccessButtonsProps {
    session?: Session | null;
}

const AccessButtons = ({ session }: AccessButtonsProps) => {
    const { open } = useAuthDialog();
    // Show different buttons based on authentication state
    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-base">
                    {session.user.name || session.user.email || 'User'}
                </span>
                <Button
                    variant="ghost"
                    className="text-base"
                    form="logout-form"
                >
                    Sign Out
                </Button>
                <form id="logout-form" action="/api/auth/signout" method="post"></form>
            </div>
        )
    }

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