import { useRouter } from "next/router";


const CodeSubmitted = () => {
  const router = useRouter();
  return (
    <div className="h-fit bg-transparent pt-[15px] w-[100%]">
      <div className="md:w-[600px] w-[94%] mx-auto bg-white shadow-lg rounded-[7px] px-6 py-8 text-center">
        
        <h1 className="text-3xl font-extrabold text-pink-600 mb-4">✅ Code Submitted Successfully!</h1>

        <p className="text-gray-700 text-base mb-2">
          You&apos;ve successfully entered your code for the <span className="font-semibold text-pink-600">Online Squid Game 2</span>.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Stage 2 of Squid Game 2.0 is now officially Opened, closes at exactly 10pm, <strong className="text-black">Click the button below to start.</strong>
        </p>

        {/* Coming Soon Button */}
        <button
          onClick={()=>{router.push('/collaborations/squid-game/quiz')}}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-[5px] mb-6"
        >
          Enter game room
        </button>

        {/* What's Next Section */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-[7px] p-5 text-left">
          <h2 className="text-lg font-bold text-green-500 mb-2">What&apos;s Next?</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>
              The game is hosted in collaboration with <span className="font-semibold text-pink-500">Kidmiel BOT</span>.
            </li>
            <li>
              You&apos;ll receive further instructions via WhatsApp from Kidmiel BOT.
            </li>
            <li>
              You will be added to the official game group after code verification.
            </li>
            <li>
              This page will be unlocked on game day so you can access your challenge.
            </li>
          </ul>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          If you have any issues, contact Kidmiel BOT support through the WhatsApp line used for registration.
        </p>
      </div>
    </div>
  );
}

export default CodeSubmitted;
