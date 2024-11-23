import { useState } from "react";
import Quiz from "@/components/Quiz";
import ProductLanding from "@/components/ProductLanding";

function GiveawayQuiz() {
    const [ isPlay, setIsPlay ] = useState('hidden')
  
    return (
      <>
        {/* <WelcomeScreen2 toc={TandC} section={section} title="Giveaway Quizes"/> */}
        <Quiz state={isPlay} />
        <ProductLanding startGame={setIsPlay} isPlay={isPlay}/>
      </>
    )
  }

export default GiveawayQuiz;