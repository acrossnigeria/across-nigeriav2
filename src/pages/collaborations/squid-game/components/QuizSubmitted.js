import React from "react";
import {
  CheckCircle,
  Clock,
  PartyPopper,
  Instagram,
  Share2,
  Gamepad2,
} from "lucide-react";
import Button from "@/components/ui/Button";// Adjust based on your project
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function QuizSubmitted() {
  const router = useRouter();
  return (
    <Layout>
    <div className="h-fit flex flex-col items-center justify-center px-4 py-10 bg-white text-center">
      <CheckCircle size={80} className="text-green-600 mb-4 animate-bounce" />

      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        Quiz Submitted <PartyPopper size={24} className="text-yellow-500" />
      </h1>

      <p className="text-gray-600 max-w-md mb-4">
        You&apos;ve successfully completed your quiz for the Across Nigeria: Squid Game 2.0!
      </p>

      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm mb-6">
        <Clock size={18} />
        <span>Results will be revealed soon. Stay tuned!</span>
      </div>

      <div className="space-y-3 w-full max-w-sm">
        <Button
          variant="default"
          className="w-full rounded-full bg-primary text-white px-6 py-2 hover:bg-primary/90 transition flex items-center justify-center gap-2"
          onClick={() =>
            window.open("https://instagram.com/across_nigeria_reality_show", "_blank")
          }
        >
          <Instagram size={18} />
          Follow Us on Instagram
        </Button>

        <Button
          variant="outline"
          className="w-full rounded-full px-6 py-2 flex items-center justify-center gap-2"
          onClick={() => {
            const message = encodeURIComponent(
              "I just completed my quiz in the Across Nigeria Squid Game challenge! 🦑🇳🇬🔥 Join the challenge now! https://acrossnig.com"
            );
            window.open(`https://wa.me/?text=${message}`, "_blank");
          }}
        >
          <Share2 size={18} />
          Share on WhatsApp
        </Button>

        <Button
          variant="secondary"
          className="w-full rounded-full px-6 py-2 flex items-center justify-center gap-2"
          onClick={() => (router.push('/'))}
        >
          <Gamepad2 size={18} />
          Explore Other Games Shows
        </Button>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Your submission has been recorded. Good luck!
      </p>
    </div>
    </Layout>
  );
}
