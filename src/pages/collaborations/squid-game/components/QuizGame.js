import ProcessLoader from "@/components/ui/ProcessLoader";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Hourglass, Timer, TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const quizData = [
    { question: "Who was the first indigenous Governor-General of Nigeria?", options: ["Tafawa Balewa", "Nnamdi Azikiwe", "Obafemi Awolowo", "Yakubu Gowon"], answer: "Nnamdi Azikiwe" },
    { question: "In what year did Nigeria become a republic?", options: ["1960", "1979", "1999", "1963"], answer: "1963" },
    { question: "Who was the first woman to run for president in Nigeria?", options: ["Sarah Jibril", "Ngozi Okonjo-Iweala", "Aisha Yesufu", "Dora Akunyili"], answer: "Sarah Jibril" },
    { question: "Which of these Nigerian states shares a border with Cameroon?", options: ["Kebbi", "Niger", "Edo", "Taraba"], answer: "Taraba" },
    { question: "What does the green color on the Nigerian flag represent?", options: ["Natural wealth", "Peace", "Military strength", "Prosperity"], answer: "Natural wealth" },
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

const SG_QuizGame = ( { toSuccess, entryCode, userId } ) => {

    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ direction, setDirection ] = useState(1);
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const [ usersAnswers, setUsersAnswers ] = useState( []);

    const [ isSubmiting, setIsSubmiting ] = useState(false);
    const [ submitSuccess, setSubmitSuccess ] = useState(false);

    const [ errorTop, setErrorTop ] = useState("top-0");
    const [ errorOpacity, setErrorOpacity ] = useState("opacity-0");
    const [ submitError, setSubmitError ] = useState("Unknown");
    const [ showSubmitError, setShowSubmitError ] = useState(false);

    const [ countSec, setCountSec ] = useState(0);
    const [ countMin, setCountMin ] = useState(0);
    const [ countHr, setCountHr ] = useState(0);
    const [ timeCount, setTimeCount ] = useState(0); // this is the total count in seconds

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

    const submit = async () => {
        if (!selectedAnswer) {
            handleError();
            return;
        }

        const quizMark = usersAnswers.map( ( selection, index ) => {
            const mark = quizData[index].answer === selection;
            return mark;
        })
        quizMark.push(selectedAnswer === quizData[currentIndex].answer) // mark last question

        setIsSubmiting(true);
        setShowSubmitError(false);

        try {
            const data = { mark:quizMark, entryCode, timeCount, userId };
            const response = await axios.post('/api/squid_game/participant', data);
            if ( response.status === 200 ) {
                handleSubmitSuccess()
            } else {
                handleSubmitError("Something went wrong when submit your result");
            }
        } catch(err) {
            handleSubmitError(err.message);
        }
        
    }

    const handleSubmitError = (errorMsg) => {
        setSubmitError(errorMsg);
        setShowSubmitError(true);
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
        setTimeCount(timeCount+1);
    }, 1000);

    const handleSubmitSuccess = () => {
        setSubmitSuccess(true);
        setTimeout(() => {
            toSuccess();
        }, 2500);
    }


    return (
        <div className="bg-gradient-to-br from-black flex flex-col items-center to-red-600 h-screen w-screen">
            { isSubmiting && (
                <div className="absolute h-screen w-screen left-0 top-0 flex flex-col justify-center items-center bg-black/50">
                    <div className="md:max-w-[400px] flex flex-col justify-center items-center w-[90%] bg-gray-100 rounded-[10px] h-[300px]">
                        { submitSuccess ? (
                            <>
                                <Check size={'80px'} strokeWidth={1} className="text-green-600 mb-5 animate-pulse"/>
                                <span className="text-[20px]">Successfully submitted</span>
                            </>
                            ):( showSubmitError ? (
                                <>
                                    <span className="text-red-600 w-[70%] text-center font-light"><strong>Error: </strong>{submitError}, please try again</span>
                                    <button onClick={submit} className="py-2 mt-3 w-[80%] bg-gray-300 hover:bg-gray-500 border-gray-700">Retry</button>
                                </>
                            ): (
                                <>
                                    <Hourglass size={'80px'} strokeWidth={3} className="text-red-600 mb-5 animate-spinner-ease-spin"/>
                                    <span className="text-[15px] mb-1">Submitting your session, please wait.</span>
                                </>
                            )
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
                    <span>{currentIndex+1}/5</span>
                    <div className="flex flex-row gap-1 w-fit items-center">
                        <Timer size={'20px'} strokeWidth={2} className="text-white"/>
                        <span>{countHr.toString().length<2 ? `0${countHr}`:countHr}:{countMin.toString().length<2 ? `0${countMin}`:countMin}:{countSec.toString().length<2 ? `0${countSec}`:countSec}</span>
                    </div>
                </div>
                <div className="w-[100%] bg-white/50 rounded-[25px] h-[30px]">
                    <div style={{width:`${( (currentIndex+1)*100)/5}%`}} className=" bg-gradient-to-r transition-all duration-300 ease-in-out h-[100%] from-transparent rounded-[25px] to-white"></div>
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
                                <span className="text-[22px] font-bold mt-4">Question <span className="text-red-600">{currentIndex+1}</span></span>
                                <div className="border-b-1 border-b-gray-300 pb-2 mt-2 text-[16px] text-gray-500">
                                    <span>Politics</span>
                                </div>
                                <h2 className="text-lg text-center mt-3 font-semibold mb-4">&quot;{quizData[currentIndex].question}&quot;</h2>
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
                                { (currentIndex + 1) < 5 ? (
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