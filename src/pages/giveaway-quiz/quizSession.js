import React, { useEffect, useState } from 'react';
import Quiz from '@/components/giveawayquiz/Quiz';
import { useRouter } from 'next/router';
import Link from 'next/link';

const QuizSession = ( { state }) => {
  // const router = useRouter();
  // async function goToHome() {
  //     await router.push('/giveaway-quiz');
  // }
  // useEffect( ()=> {
  //   goToHome();
  // })

  return (
    <Quiz/>
    // <div className='text-center mt-[80px] px-[5%] md:px-[0%]'>
    //   <span>giveaway quiz closed, redirecting you. if you were not redirected, <Link className='text-blue-600' href={'giveawau-quiz'}>Click here</Link></span>
    // </div>
  )

};

QuizSession.auth = true;
export default QuizSession;
