import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Money from '../../public/images/icon/Money';
import Video from '../../public/images/icon/Video';
import ShoutMic from '../../public/images/icon/ShoutMic';

const BottomMenu = ( { hideNav }) => {
  return (
            <div className={`${hideNav?'hidden':'flex'} mt-2 fixed bottom-0 w-[100%] z-[1000] bg-green-600 flex-row font-sans h-[50px] items-center justify-around`}>
              {/* Second Line Menus */}
                <Link style={{alignItems:'center'}} href="/giveaway-quiz" className="text-green-200 text-[12px] hover:scale-105 items-center flex flex-col justify-center">
                  <Money/>
                  Giveaway Quiz
                </Link>
                <Link style={{alignItems:'center'}} href="/soon" className="text-green-200 text-[12px] hover:scale-105 items-center flex flex-col justify-center">
                  <Video/>
                  Skits Across Naija
                </Link>
                <Link style={{alignItems:'center'}} href="/shoutout" className="text-green-200 text-[12px] hover:scale-105 items-center flex flex-col justify-center">
                  <ShoutMic/>
                Shout Out
                </Link>
            </div>
        );
    }

export default BottomMenu;