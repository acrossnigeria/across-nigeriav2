import { useState, useEffect } from "react";
import image from '../../public/images/model/model1.jpg';
import Image from "next/image";
import LikeIcon from "../../public/images/icon/LikeIcon";
import CommentIcon from "../../public/images/icon/CommentIcon";
import CommentCard from "./CommentCard";
import Close from "../../public/images/icon/Close";
import { useSession } from "next-auth/react";
import axios from "axios";
import CycleLoader from "./CycleLoader";
import SendIcon from "../../public/images/icon/SendIcon";


export default function ShoutOutCard( { details, shoutOutType }) {
    const { status, data: session } = useSession();
    const [ comments, setComments ] = useState(null);
    const [ likes, setLikes ] = useState(details.Likes);
    const [ oldLikes, setOldLikes ] = useState([]);
    const [ isLiked, setIsLiked ] = useState(details.Likes.includes(session?.user?._id));
    const [ commentInput, setCommentInput ] = useState('');
    const [ isCommentOpen, setIsCommentOpen ] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const [ userId, setUserId ] = useState(session?.user?._id);
    const [ networkError, setNetworkError ] = useState(false);
    const [ commentIsFetched, setCommentIsFetched ] = useState(false);

    async function likePost() {
        const data = { user: userId, post: details._id };
        if (isLiked) {
            setIsLiked(false);
            let newLikes = likes;
            setOldLikes([...likes])
            newLikes = newLikes.filter(id=>id!=userId);
            setLikes([...newLikes]);
            try {
                const response = await axios.patch('/api/engagement/like', data);
                setLikes(response.data.newLikes); 
            } catch (err) {
                console.log(err.message);
                setIsLiked(true);
                setLikes([...oldLikes]);
            }
            
        } else {
            setIsLiked(true);
            const newLikes = likes;
            setOldLikes([...likes]);
            newLikes.push(userId);
            setLikes([...newLikes]);
            try {
                const response = await axios.post('/api/engagement/like', data);
                setLikes(response.data.newLikes); 
            } catch (err) {
                console.log(err.message);
                setIsLiked(false);
                setLikes([...oldLikes]);
            }
        }
    }
    async function addComment() {
        const commentObject = {
            post: details._id,
            user: session?.user?._id,
            text: commentInput,
        }
        const tempCommentObject = {
            post: details._id,
            user: { _id: session?.user?._id, name: session?.user?.name, },
            text: commentInput,
            _id: 'temp',
            likes:0,
        }

        setComments([ ...comments, tempCommentObject ]);
        setCommentInput('');
        
        //send new comment to the backend to be stored
        try {
            const response = await axios.post('/api/engagement/comment', commentObject);
            const newComments = response.data.commentArray;
            setComments(newComments);
        } catch (err) {
            console.log(err.message);
        }
        
        
    }

    async function getComments() {
        const post = details._id;
        console.log(post);
        if (!commentIsFetched) {
            try {
                const response = await axios.get(`/api/engagement/comment?post=${post}`); 
                setComments(response.data);
                setCommentIsFetched(true);
            } catch (err) {
                setNetworkError(true);
            }
        }
    }

    useEffect(()=> {
        getComments();
    }, [])

    useEffect(()=>{

        if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
            setIsMobile(true)
        } else{setIsMobile(false)}

  // console.log(isMobile, navigator.userAgent)
    },[ isMobile ])

    return (
        <div className={`${isMobile?'w-[100%] flex-col':'w-fit flex-row'} gap-2 h-[fit-content] py-[10px] px-[5px] mx-auto relative bg-gray-100 border-1 border-gray-300 flex justify-center items-center rounded-[20px] `}>
            <div className="flex w-[100%] flex-col justify-center items-center">
                <div className={`${isMobile? 'w-[99%]':'w-[340px]'} h-fit`}>
                    <div className={`h-[470px] w-[100%] relative`}>
                        <Image className="rounded-[20px]" alt="shoutoutpic" layout="fill" objectFit="fill" src={details.mediaUrl}/>
                    </div>
                </div>

                <div className={`h-[470px] ${isMobile?'w-[97%]':'w-[340px]'} absolute p-1 flex justify-between flex-col rounded-[6px] bg-transparent`}>
                    <div className="flex flex-row bg-gradient-to-b from-black to-black/10 rounded-[20px] justify-end h-fit p-[10px] ">
                        <button onClick={likePost} className="bg-transparent text-white flex flex-row justify-center items-center gap-2 p-[10px] text-[17px] font-bold"><LikeIcon color={isLiked?'red':'white'}/> {likes.length}</button>
                    </div>
                    <div className="flex flex-col h-fit p-[10px] text-white bg-gradient-to-t from-black to-black/10 rounded-[20px]">
                        <span className="text-[20px] tracking-wider text-pretty font-extrabold">{details.name} </span>
                        <span className="text-[15px] font-extralight text-pretty">{details.shoutOut} </span>    
                    </div>      
                </div> 
            </div>
         
            <div className={`${isMobile?'w-full':'w-[340px] h-[470px] justify-between flex flex-col'} pt-[10px]`}>
                <div>
                    <div className="flex flex-row justify-center items-center w-fit text-[17px] font-bold gap-2"><CommentIcon/> {comments ? comments.length: 0}</div>
                    <div className={` ${isMobile?'':'h-[350px] overflow-y-scroll px-[7px]'} flex flex-col gap-2 my-[5px]`}>
                    { comments ? ( 
                        isMobile ? (
                            <div>
                                { comments.length > 0 && (<CommentCard comment={comments[0]}/>) }
                                {comments.map( comment => { 
                                    if (comment._id === 'temp') { return <CommentCard key={comment._id} comment={comment}/>}
                                })}
                            </div>
                        ): ( comments.length > 0 ? (
                            comments.slice().reverse().map(user=>( <CommentCard key={user._id} comment={user}/>))
                            ) : (
                                <div className="h-full flex flex-col justify-center items-center"> 
                                    <span className="font-extrabold text-[18px]">No comments yet</span>
                                    <span className="text-gray-600">Be the first to comment</span>
                                </div>
                            )
                            
                        )
                        ) : (
                            isMobile ? (
                                <div>
                                    <div className="h-[20px] w-full bg-gray-400 animate-pulse rounded-[20px]"></div> 
                                </div>
                              
                            ): ( 
                                    <div className="h-full flex flex-col justify-center items-center w-full">
                                        <CycleLoader/>
                                    </div>  
                            )
                        )
                    }
                    <button onClick={()=>{ setIsCommentOpen(!isCommentOpen)}} className={`${isMobile?'':'hidden'} w-fit hover:bg-gray-200 h-[30px] rounded-[30px] px-[10px]`}>...See all comments</button>
                    </div>   
                </div>
             
                <div className={`${session?.user ? '':'hidden'} w-full flex flex-row justify-center items-center gap-2`}>
                    <input value={commentInput} onChange={(e)=>{setCommentInput(e.target.value)}} type="text" className="bg-gray-300 rounded-[20px] px-3 h-[45px] w-[280px]" placeholder="Drop a comment"/>
                    <button onClick={addComment} className="h-[45px] w-[45px] flex flex-row justify-center items-center hover:bg-green-800 bg-green-600 font-bold text-white rounded-[50%]"><SendIcon/> </button>
                </div>
            </div>
            <div className={`${isCommentOpen?'':'hidden'} ${shoutOutType==='premium' ? 'w-screen h-screen fixed':'w-full absolute h-full'} top-0 z-[1000] bg-black/70 flex flex-col justify-center items-center`}>
                <div className="w-[89%] flex flex-col rounded-[20px] justify-between bg-gray-50 h-[500px] p-3">
                    <div className="flex flex-row justify-end">
                        <button onClick={()=>{setIsCommentOpen(!isCommentOpen)}} className="hover:bg-gray-200 rounded-[50%] p-2 w-fit"><Close/></button>
                    </div>
                    <span className="text-center font-bold text-[17px]">Comments</span>
                    <div className="flex flex-col h-[400px] p-1 gap-1 overflow-y-scroll">
                        { comments ? (
                            comments.length>0? (
                            comments.slice().reverse().map(user=>( <CommentCard key={user._id} comment={user}/>)) 
                            ) : (
                                <div className="h-full flex flex-col justify-center items-center"> 
                                    <span className="font-extrabold text-[18px]">No comments yet</span>
                                    <span className="text-gray-600">Be the first to comment</span>
                                </div>
                            )
                        ): (
                            <div className="h-full flex flex-col justify-center items-center w-full">
                                <CycleLoader/>
                            </div>
                        )
                        }  
                    </div>
                    
                </div>
                
            </div>
          
        </div>
    )
}