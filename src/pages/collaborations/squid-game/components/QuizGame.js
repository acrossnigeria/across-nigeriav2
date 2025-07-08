import ProcessLoader from "@/components/ui/ProcessLoader";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Hourglass, Timer, TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const quizData = [
  { question: "What is the capital of Nigeria?", options: ["Abuja", "Lagos", "Kano", "Enugu"], answer: "Abuja" },
  { question: "What year did Nigeria gain independence?", options: ["1960", "1956", "1970", "1980"], answer: "1960" },
  { question: "What currency is used in Nigeria?", options: ["Dollar", "Naira", "Pound", "Euro"], answer: "Naira" },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const SG_QuizGame = ( { toSuccess } ) => {

    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ direction, setDirection ] = useState(1);
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const [ usersAnswers, setUsersAnswers ] = useState( []);

    const [ isSubmiting, setIsSubmiting ] = useState(false);
    const [ submitSuccess, setSubmitSuccess ] = useState(false);

    const [ errorTop, setErrorTop ] = useState("top-0");
    const [ errorOpacity, setErrorOpacity ] = useState("opacity-0");

    const [ countSec, setCountSec ] = useState(0);
    const [ countMin, setCountMin ] = useState(0);
    const [ countHr, setCountHr ] = useState(0);

    const { data:session } = useSession();

    const handleError = () => {
        setErrorOpacity("opacity-100");
        setTimeout(() => {
            setErrorTop("top-[150px]");
            setTimeout(() => {
                setErrorTop("top-0");
                setTimeout(() => {
                    setErrorOpacity('opacity-0'); 
                }, 50);
            }, 1500);
        }, 50);
    }

    const handleNext = () => {
        if (!selectedAnswer) {
            handleError();
            return;
        }

        if (currentIndex < quizData.length - 1) {
            setUsersAnswers( [ ...usersAnswers, selectedAnswer ] );
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
            setSelectedAnswer(null);
        }
    };

    const handleSelection = ( selection ) => {
        setSelectedAnswer(selection);
    }

    const submit = () => {
        if (!selectedAnswer) {
            handleError();
            return;
        }
        setIsSubmiting(true);

        const quizMark = usersAnswers.map( ( selection, index ) => {
            const mark = quizData[index].answer === selection;
            return mark;
        })
        quizMark.push(selectedAnswer === quizData[currentIndex].answer) // mark last question

        handleSubmitSuccess();
        
    }

    setTimeout(() => {
        if ( isSubmiting ) {
            return;
        }
        if ( countMin === 59 ) { 
            setCountHr( countHr < 24 ? countHr+1 : 0 );
        }
        if ( countSec === 59 ) { 
            setCountMin( countMin < 60 ? countMin+1 : 0 );
        }
        setCountSec( countSec < 60 ? countSec+1 : 0 );
    }, 1000);

    const handleSubmitSuccess = () => {
        setTimeout(() => {
            setSubmitSuccess(true);
            setTimeout(() => {
                toSuccess();
            }, 2000);
        }, 6000);
    }


    return (
        <div className="bg-gradient-to-br bg-green-600 from-green-500 flex flex-col items-center to-pink-700 h-screen w-screen">
            { isSubmiting && (
                <div className="absolute h-screen w-screen left-0 top-0 flex flex-col justify-center items-center bg-black/50">
                    <div className="md:max-w-[400px] flex flex-col justify-center items-center w-[90%] bg-gray-100 rounded-[10px] h-[300px]">
                        { submitSuccess ? (
                            <>
                                <Check size={'80px'} strokeWidth={1} className="text-green-600 mb-5 animate-pulse"/>
                                <span className="text-[20px]">Successfully submitted</span>
                            </>
                            ):(
                            <>
                                <Hourglass size={'80px'} strokeWidth={1} className="text-pink-600 mb-5 animate-spinner-ease-spin"/>
                                <div className="flex flex-row gap-1 items-center">
                                    <ProcessLoader/>
                                    <span className="text-[15px] mb-1">Submitting your session, please wait.</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <div className={`flex flex-row md:max-w-[400px] w-[90%] text-[15px] border-1 transition-all duration-300 ease-in-out border-red-300 text-red-600 p-3 items-center justify-center gap-2 bg-red-100 rounded-[5px] absolute ${errorTop} ${errorOpacity}`}>
                <span>Please select an option to move to the next question</span>
                <TriangleAlert strokeWidth={1} size={'15px'} className="text-red-600"/>
            </div>
            <div className="md:max-w-[600px] flex flex-col w-[100%] px-[3%] h-full pt-5 pb-6 ">
                <div className="w-[100%] font-semibold text-white px-2 h-fit mb-4 flex flex-row justify-between items-center">
                    <span>{currentIndex+1}/3</span>
                    <div className="flex flex-row gap-1 w-fit items-center">
                        <Timer size={'20px'} strokeWidth={2} className="text-white"/>
                        <span>{countHr.toString().length<2 ? `0${countHr}`:countHr}:{countMin.toString().length<2 ? `0${countMin}`:countMin}:{countSec.toString().length<2 ? `0${countSec}`:countSec}</span>
                    </div>
                </div>
                <div className="w-[100%] bg-white/50 rounded-[25px] h-[30px]">
                    <div style={{width:`${( (currentIndex+1)*100)/3}%`}} className=" bg-gradient-to-r transition-all duration-300 ease-in-out h-[100%] from-transparent rounded-[25px] to-white"></div>
                </div>

                <div className="flex-grow flex-1 h-[100%] mt-5">
                    <div className="overflow-hidden h-[100%]">
                        <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="w-full h-full flex flex-col gap-3 justify-start items-center"
                        >
                            <div className="bg-gray-100 text-center rounded-[20px] w-full p-3">
                                <span className="text-[22px] font-bold mt-4">Question <span className="text-green-600">{currentIndex+1}</span></span>
                                <div className="border-b-1 border-b-gray-300 pb-2 mt-2 text-[16px] text-gray-500">
                                    <span>Politics</span>
                                </div>
                                <h2 className="text-lg text-center mt-3 font-semibold mb-4">"{quizData[currentIndex].question}"</h2>
                            </div>
                            <ul className="space-y-2 w-full">
                            {quizData[currentIndex].options.map((opt, idx) => (
                                <li key={idx} onClick={() => { handleSelection( opt ) }} className={`py-4 px-4 border-1 flex flex-row justify-between items-center ${selectedAnswer === opt ? 'border-green-600 bg-green-200':'border-gray-700 bg-gray-100 hover:bg-gray-200'} w-full rounded-[15px] font-medium cursor-pointer`}>
                                    <span>{opt}</span>
                                    <div className={`w-[25px] h-[25px] border-1 flex flex-col justify-center items-center rounded-full ${selectedAnswer === opt ? 'border-none bg-green-500':'border-gray-700 bg-transparent'}`}>
                                        { selectedAnswer === opt && <Check strokeWidth={4} size={'17px'} className="text-white"/> }
                                    </div>
                                </li>
                            ))}
                            </ul>

                            <div className="flex-grow flex-1 flex justify-end flex-col w-full">
                                { (currentIndex + 1) < 3 ? (
                                    <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 w-full rounded-[30px] font-medium text-white h-[50px] disabled:opacity-40" disabled={currentIndex === quizData.length - 1}>
                                    Next
                                    </button>
                                ): (
                                    <button onClick={submit} className="bg-green-500 w-full text-white h-[50px] hover:bg-green-600 font-medium rounded-[30px] disabled:opacity-40" >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SG_QuizGame;