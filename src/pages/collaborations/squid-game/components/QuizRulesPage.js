import React from "react";
import {
  ScrollText,
  Timer,
  Brain,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function QuizRulesPage( { startQuiz }) {

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-12 flex flex-col items-center justify-center text-center">
      <ScrollText size={'45px'} className="text-red-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Survive the Quiz: Stage 2</h1>
      <p className="text-gray-400 mb-6 max-w-md">
        Welcome to the next phase of the <span className="text-white">Across Nigeria Reality Show:</span> Squid Game 2.0 in collaboration with Kidmiel BOT.
        This challenge contains only <strong className="text-white">5 questions</strong>, but don&apos;t take it lightly.
      </p>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-left max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Info size={20} className="text-yellow-400" />
          Important Rules
        </h2>

        <ul className="space-y-3 text-xs text-gray-300">
          <li className="flex flex-row items-start gap-2">
            <CheckCircle2 size={"16px"} className="text-green-500 mt-1" />
            <span>You must answer <strong className="text-white">all 5 questions</strong> correctly to survive.</span>
          </li>
          <li className="flex flex-row items-start gap-2">
            <Timer size={"21px"} className="text-orange-500" />
            <span><strong className="text-white">Speed matters:</strong> faster you complete the quiz, higher your chance of winning.</span>
          </li>
          <li className="flex items-center gap-2">
            <Brain size={"16px"} className="text-blue-400 mt-1" />
            You can&apos;t go back to previous questions.
          </li>
        </ul>

        <div className="mt-6 text-sm text-yellow-300 font-medium">
          🧠 <em>Clue:</em> Think fast, answer correctly, and finish quick.
        </div>
      </div>

      <Button
        className="mt-8 px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
        onClick={startQuiz}
      >
        Start Quiz
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}
