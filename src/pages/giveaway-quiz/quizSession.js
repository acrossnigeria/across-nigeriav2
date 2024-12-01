import React, { useState } from 'react';
import Quiz from '@/components/giveawayquiz/Quiz';

const quizSession = ( { state }) => {
  return (
    <Quiz/>
  )

};
quizSession.auth = true;
export default quizSession;
