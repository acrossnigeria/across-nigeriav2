import Layout from '@/components/Layout'
import Quiz from '@/components/Quiz';
import WelcomeScreen2 from '@/components/WelcomScreen2';
import React from 'react'
const section="GIVE AWAY QUIZZES"
const TandC = (
  <div>
    <h2 className={`font-bold text-center text-xl underline`}>TERMS AND CONDITIONS</h2>
    <ol>
      <li>
        <h3 className={`font-bold text-lg underline`}>ELIGIBILITY:</h3>
        <ul>
          <li>All contestants must be registered subscribers to the website, having paid the one-time registration fee of One Thousand Naira (₦1000).</li>
          <li>Contestants must pay the Contestant Fee of Ten Thousand Naira (₦10,000) to participate in the reality show.</li>
        </ul>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>COMPETITIONS STRUCTURE:</h3>
        <ul>
          <li>The competition will consist of two stages: Stage 1 covering 12 monthly auditions and Stage 2 as an online competition.</li>
          <li>In Stage 1, contestants will produce a SKIT of their choice and upload a video (1-minute maximum) on the website.</li>
          <li>Uploaded content and Skit must be original and have the permission of all participants in the Skit video.</li>
        </ul>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>RESPONSIBILITY AND LIABILITY:</h3>
        <ul>
          <li>Entertainment Methodz Ltd will not be responsible for any infringement of rights or injuries caused during the production, broadcasting, or later use of the content.</li>
        </ul>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>MONTHLY WINNER:</h3>
        <ul>
          <li>The contestants with the most accrued votes each month will be declared the SKIT OF THE MONTH.</li>
        <li>Each monthly audition is a standalone competition; contestant fees and votes do not carry over to the next month.</li>
        </ul>      
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>MONTHLY PRIZES</h3>
        <ul><li>
          The Skit of the month winner will win a cash prize of Five Hundred Thousand Naira (₦500,000) and other advertised prizes.
          </li></ul>
      </li>
      <li><h3 className={`font-bold text-lg underline`}>ADVANCEMENT TO STAGE TWO:</h3><ul><li>
        The 12 Skits of the month winners automatically qualify for Stage 2 of the competition.
        </li></ul></li>
        
      <li>
        <h3 className={`font-bold text-lg underline`}>STAGE 2 COMPETITION:</h3>
        <p>The 12 Skits of the month winners will be sent a SKIT TOPIC in the first week in January. They would be expected to produce a SKIT representing and interpreting the given topic within a week.</p>
        <p>This new Skit must be original and the video Uploaded in our website at no extra cost. The video will be exhibited on our website and social media handles.</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>SKIT OF THE YEAR:</h3>
        <p>All 12 SKITS OF THE MONTH will compete in Stage 2, and the SKIT with the most votes and {`Judges' assessment will win "SKIT OF THE YEAR ACROSS NIGERIA."`}</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>SKIT OF THE YEAR PRIZE:</h3>
        <p>The w{`inner of "SKIT OF THE YEAR ACROSS NIGERIA"`} will receive a cash prize of Forty Million Naira (₦40,000,000) and other prizes.</p>
        <p>The winner will be declared in a live ceremony covered on TV.</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>VIOLATIONS and DISQUALIFICATIONS:</h3>
        <p>Any contestant violating the rules may be penalized or disqualified.</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>ORGANIZERS DECISION:</h3>
        <p>The decision of the organizers in all matters related to the reality show will be final.</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>PROMOTION AND USE OF CONTENT:</h3>
        <p>Entertainment Methodz Ltd shares copyright ownership with the Uploader/s of all uploaded content and can use content for promotions and advertisements on various platforms.</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>PRIVACY POLICY:</h3>
        <p>Participant informat ion will be handled in accordance with the {`website's`} privacy policy.</p>
      </li>
      <li>
        <h3 className={`font-bold text-lg underline`}>ACCEPTANCE OF TERMS & CONDITIONS:</h3>
        <p>By participating in the {` "Skit Across Nigeria Reality Show"`}, all contestants have accepted and agreed to abide by these terms and conditions.</p>
      </li>
      {/* Add other sections similarly */}
    </ol>
  </div>
);
function giveaway() {

  return (
    <Layout>
      <WelcomeScreen2 toc={TandC} section={section} title="Giveaway Quizes"/>
      <Quiz />
    </Layout>
  )
}


giveaway.auth=true;
  export default giveaway