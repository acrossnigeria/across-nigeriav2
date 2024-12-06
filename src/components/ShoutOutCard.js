import { useState, useEffect } from "react";
import image from '../../public/images/model/model1.jpg';
import Image from "next/image";
import LikeIcon from "../../public/images/icon/LikeIcon";
import CommentIcon from "../../public/images/icon/CommentIcon";
import CommentCard from "./CommentCard";
import Close from "../../public/images/icon/Close";
import { useSession } from "next-auth/react";

const prototype = [
    { index: 1, name: 'cynthia', text: 'As you add another year, may grace, beauty, and favor never depart from you. Happy birthday!', likes:3 },
    { index: 2, name: 'bayo', text: 'Happy birthday dear', likes:1 },
    { index: 3, name: 'john', text: 'A queen was born today! Happy birthday, my beautiful sister. Shine on, you’re unstoppable!', likes:1 },
    { index: 4, name: 'kunle', text: 'Happy birthday to the most elegant and beautiful woman I know. Na you dey run the show!', likes:4 },
    { index: 5, name: 'kunle', text: 'Happy birthday to the most elegant and beautiful woman I know. Na you dey run the show!', likes:0 },
    { index: 6, name: 'remi', text: 'Who fine pass you today? Nobody! Happy birthday, gorgeous. God go continue to bless you!', likes:1 },
    { index: 7, name: 'chioma', text: 'Person wey fine no suppose grow old o! Happy birthday, jare. Enjoy your day!', likes:9 },
    { index: 8, name: 'hassan', text: 'Na today angels dey celebrate extra o! HBD my sister, God’s blessings always', likes:1 },
    { index: 9, name: 'barry', text: 'Na you we dey celebrate today o! Happy birthday my person!', likes:5 },
    { index: 10, name: 'shedrack', text: 'Big vibes only! HBD, fine lady. More life and blessings', likes:0 },
    { index: 11, name: 'mercy', text: 'May God continue to bless and uplift you, my dear. Happy birthday, and keep shining!', likes:1 }
]

export default function ShoutOutCard() {
    const [ comments, setComments ] = useState(prototype);
    const [ isCommentOpen, setIsCommentOpen ] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const { status, data: session } = useSession();

    useEffect(()=>{
      if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
      setIsMobile(true)
    } else{setIsMobile(false)}
  // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])

    return (
        <div className={`${isMobile?'w-[90%] flex-col':'w-fit flex-row'} gap-2 h-[fit-content] py-[10px] px-[10px] mx-auto bg-gray-100 border-1 border-gray-300 flex justify-center items-center rounded-[5px] `}>
            <div className="flex w-[100%] flex-col justify-center items-center">
                <div className={`${isMobile? 'w-[99%]':'w-[340px]'} h-fit`}>
                    <div className={`h-[470px] w-[100%] relative`}>
                        <Image placeholder="blur" className="rounded-[6px]" alt="shoutoutpic" layout="fill" objectFit="fill" src={image}></Image>
                    </div>
                </div>

                <div className={`h-[470px] ${isMobile?'w-[75%]':'w-[340px]'} absolute p-1 flex justify-between flex-col rounded-[6px] bg-transparent`}>
                    <div className="flex flex-row bg-gradient-to-b from-black to-black/10 rounded-[5px] justify-end h-fit p-[10px] ">
                        <button className="bg-transparent text-white flex flex-row justify-center items-center gap-2 p-[10px] text-[17px] font-bold"><LikeIcon color={'white'}/> 0</button>
                    </div>
                    <div className="flex flex-col h-fit p-[10px] text-white bg-gradient-to-t from-black to-black/10 rounded-[5px]">
                        <span className="text-[20px] tracking-wider text-pretty font-extrabold">A beauty & more </span>
                        <span className="text-[15px] font-extralight text-pretty">Shouting out to this beautifull model and also to say a happy birthday to her. </span>    
                    </div>      
                </div> 
            </div>
         
            <div className={`${isMobile?'w-full':'w-[340px] h-[470px] justify-between flex flex-col'} pt-[10px]`}>
                <div>
                    <div className="flex flex-row justify-center items-center w-fit text-[17px] font-bold gap-2"><CommentIcon/> 0</div>
                    <div className={` ${isMobile?'':'h-[350px] overflow-y-scroll px-[7px]'} flex flex-col gap-2 my-[5px]`}>
                    {isMobile?(
                        <CommentCard likes={comments[0].likes} name={comments[0].name} text={comments[0].text}/>
                    ): (
                        comments.map(user=>( <CommentCard key={user.index} likes={user.likes} name={user.name} text={user.text}/>))
                    )}
                    <button onClick={()=>{ setIsCommentOpen(!isCommentOpen)}} className={`${isMobile?'':'hidden'} w-fit hover:bg-gray-200 h-[30px] rounded-[30px] px-[10px]`}>...See all comments</button>
                    </div>   
                </div>
             
                <div className={`${session?.user ? '':'hidden'} w-full flex flex-row justify-center gap-2`}>
                    <input type="text" className="bg-gray-300 pl-2 rounded-[5px] h-[40px] w-[280px]" placeholder="Drop a comment"/>
                    <button className="px-[7px] bg-blue-500 font-bold text-white rounded-[5px]">Send</button>
                </div>
            </div>
            <div className={`${isCommentOpen?'':'hidden'} w-screen h-screen fixed top-0 z-30 bg-black/70 flex flex-col justify-center items-center`}>
                <div className="w-[85%] flex flex-col rounded-[5px] justify-between bg-gray-50 h-[470px] p-3">
                    <div className="flex flex-row justify-end">
                        <button onClick={()=>{setIsCommentOpen(!isCommentOpen)}} className="hover:bg-gray-200 rounded-[50%] p-2 w-fit"><Close/></button>
                    </div>
                    <span className="text-center font-bold text-[17px]">Comments</span>
                    <div className="flex flex-col h-[400px] p-3 gap-1 overflow-y-scroll">
                        { comments.length>0? (
                         comments.map(user=>( <CommentCard key={user.index} likes={user.likes} name={user.name} text={user.text}/>)) 
                        ) : (
                            <div className="h-full flex flex-col justify-center items-center"> 
                                <span className="font-extrabold text-[18px]">No comments yet</span>
                                <span className="text-gray-600">Be the first to comment</span>
                            </div>
                        )
                        }  
                    </div>
                    
                </div>
                
            </div>
          
        </div>
    )
}