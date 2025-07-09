import React from "react";
import { ShieldX, AlertTriangle, ArrowLeft, Gamepad } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NoAccessPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6 py-12 text-center">
      <ShieldX size={72} className="text-red-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      
      <p className="text-gray-400 max-w-md mb-6">
        You are not eligible to take this quiz at this time.
      </p>

      <div className="bg-red-100 border-1 border-red-400 text-red-900 px-5 py-4 rounded-xl text-sm flex flex-col gap-2 max-w-md mb-6 text-left">
        <div className="flex gap-2 items-start">
          <AlertTriangle size={18} className="mt-0.5 text-yellow-600" />
          <span>
            <strong>Unregistered:</strong> You must register before participating.
          </span>
        </div>
        <div className="flex gap-2 items-start">
          <AlertTriangle size={18} className="mt-0.5 text-yellow-600" />
          <span>
            <strong>Disqualified:</strong> You didn’t complete or pass Stage 1 (WhatsApp challenge).
          </span>
        </div>
        <div className="flex gap-2 items-start">
          <AlertTriangle size={18} className="mt-0.5 text-yellow-600" />
          <span>
            <strong>Cheating detected:</strong> You attempted to bypass verification.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          className="rounded-full bg-green-600 text-white flex items-center py-2 gap-2 justify-center"
          onClick={() => window.open("https://acrossnigeria.com/register", "_blank")}
        >
          <Gamepad size={18} />
          Explore other Games Shows
        </Button>

        <Button
          variant="outline"
          className="rounded-full border-white text-white flex py-2 items-center gap-2 justify-center"
          onClick={() => window.location.href = "/"}
        >
          <ArrowLeft size={18} />
          Return to Homepage
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-6">
        If you believe this is an error, please message us on Instagram <span className="underline">@across_nigeria_reality_show</span>
      </p>
    </div>
  );
}
