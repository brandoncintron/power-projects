import { AlertTriangle } from "lucide-react";

export default function AlertBanner() {
  return (
    <div className="bg-yellow-100 text-yellow-800 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} />
          <p className="text-sm font-medium">
            This project is currently in development. Some features may not be
            available.
          </p>
        </div>
      </div>
    </div>
  );
}
