"use client"
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "../../../../../utils/error";
import axios from "axios";
import 'next-cloudinary/dist/cld-video-player.css';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import PaystackBtn from "@/components/PaystackBtn";
import InfoIcon from "../../../../../public/images/icon/InfoIcon";
import ContestIcon from "../../../../../public/images/icon/ContestIcon";
import Profile from "../../../../../public/images/icon/Profile";
import Close from "../../../../../public/images/icon/Close";
import CycleLoader from "@/components/CycleLoader";
import VotedIcon from "../../../../../public/images/icon/VotedIcon";
import VoteIcon from "../../../../../public/images/icon/VoteIcon";
import ShareIcon from "../../../../../public/images/icon/ShareIcon";
import Link from "next/link";
import Next from "../../../../../public/images/icon/Next";
const sampleVid = '/sample.MP4'

const prototype = {
    email:'aliman2952003@gmail.com',
    description:"The rocks are formed as a result of transportation agents like wind, water and ice which moves loosed weathered rock materials and deposit them in the form of layers called sediments which when subjected to heavy pressure undergo compaction and cementation",
    url: sampleVid,
    title: 'Gauss Jordan Elimination & Reduced Row Echelon Form',
    name: 'Aliman ahmed'
}

export default function SkitScreen(props){
  const skit = prototype;
  const { query } = useRouter();
  const router= useRouter();
  const [ isMobile, setIsMobile ] = useState(false);
  const [ descriptionLength, setDescriptionLength ] = useState(40);
  const [ voted, setVoted ] = useState(false);
  const [ voteLoading, setVoteLoading ] = useState(false);
  const [ shareNotifyBottom, setShareNotifyBottom ] = useState('bottom-[-50px]');
  const [ shareNotifyOpacity, setShareNotifyOpacity ] = useState('opacity-0');
  const [ shareLink, setShareLink ] = useState('https//sample');

  useEffect(()=>{
    if ( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)" ).matches) {
        setIsMobile(true);
    } else{setIsMobile(false)}
// console.log(isMobile, navigator.userAgent)
  },[ isMobile ])

  if (!skit){
    return<Layout title="Skit not Found"><div>Skit not found</div></Layout>;
  }

const handleChange = (e) => {
    const { name, value } = e.target;
    // Update state based on input field name
    if (name === 'amount') {
    if (/^\d*$/.test(value)) {
    setAmount(value);
    setPayment(value * 100); // Calculate payment amount
    } else {
    alert('Please enter only whole numbers.');
    }
    } else if (name === 'email') {
    setEmail(value);
    }
    // Check if the entered value is a whole number
   
};
      
const voteHandler = async()=>{
    try{
        setLoadVote(true)
        const id=skit._id;
        const result=await axios.post('/api/vote',{ id,amount});
        console.log("Result is:", result)
        toast.success("success")
        setLoadPay(false)
        setEmail('');
        setAmount("");
        setLoadVote(false);
        router.push("/skitsPage")
    }
    catch (err){
        toast.error(getError(err));
    }
}
    
    const descriptionView = () => {
        if (descriptionLength===skit.description.length) {
            setDescriptionLength(120);
        } else {
            setDescriptionLength(skit.description.length)
        }
    }

    const handleVote = () => {
        setVoteLoading(true);

        setTimeout(() => {
            setVoted(!voted);
            setVoteLoading(false)
        }, 5000);
    }

    const displayShareNotifier = () => {
        setShareNotifyBottom('bottom-[100px]');
        setShareNotifyOpacity('opacity-100');
        setTimeout(() => {
            setShareNotifyBottom('bottom-[-50px]');
            setShareNotifyOpacity('opacity-50');
        }, 3000);
    }

    async function copyShareLink() {
        try {
           await navigator.clipboard.writeText(shareLink);
           displayShareNotifier();
        } catch (err) {
           alert('An error occurred when copying ref link');
        }
     }

  return(
        <Layout hideNav={true} title={skit.title}>
          <div className={`flex md:w-[50%] bg-gray-100 mx-auto rounded-[20px] justify-center items-center gap-4 flex-col`}>
            <div className={`bg-gray-100`}>
              <ReactPlayer autoPlay url={skit.url} width={'100%'} height={isMobile?280:300}  controls={true} />
            </div> 
            <div className={`fixed ${shareNotifyBottom} ${shareNotifyOpacity} transition-all ease-in-out duration-500 bg-gray-100 text-gray-600 rounded-[30px] md:w-fit w-[80%] border-1 border-green-500 h-fit p-3`}>
                <span>Link copied, you can now share it</span>
            </div> 
            <div className={`w-full md:w-[100%] flex flex-col px-[3%] md:px-0 md:pb-[80px] pb-[150px]`}>
                <div className="flex flex-col mb-[10px] gap-1">
                    <span style={{lineHeight:'21px'}} className="text-[21px]">{skit.title}</span>
                </div>
                <span style={{lineHeight:'20px'}} onClick={descriptionView} className="hover:cursor-pointer text-gray-700">{ skit.description.slice(0, descriptionLength) + (descriptionLength!==skit.description.length?'... See more':'') }</span>
                <div className="flex flex-row justify-between mt-[10px] items-center">
                    <div className="flex flex-row text-[18px] items-center gap-2"><Profile size={'40px'}/>{skit.name}</div>
                    <button onClick={handleVote} className={`${voted?'text-gray-300 bg-gray-800 hover:bg-gray-900':'text-gray-700 hover:bg-gray-400 bg-gray-300'} w-[130px] flex flex-row gap-2 items-center justify-center h-[40px] rounded-[25px] hover:scale-105`}>
                        { voteLoading?(
                            <CycleLoader size={'20px'}/>
                        ): (
                            voted?<VotedIcon/>:<VoteIcon/>
                        )}
                        <span>{ voted? 'Voted':'Vote' }</span>
                    </button>
                </div>
                <div className="flex flex-row justify-between pb-[5px] pt-[5px] items-center">
                    <div className="text-gray-800 text-[16px] font-bold" >• 123 votes •</div>
                    <div className="flex flex-row gap-2 w-fit">
                        <button onClick={copyShareLink} className='w-[100px] flex flex-row gap-1 items-center justify-center py-2 rounded-[25px] text-gray-700 hover:scale-105 hover:bg-gray-400'><ShareIcon/> Share</button>
                    </div>
                </div>
                <div className="inline-flex bg-gray-300 rounded-[25px] w-[100%] text-[13px] text-gray-800 p-2 mt-[5px] gap-2 items-center"><ContestIcon />Contesting for Best Drama in Theater Drama Across Nigeria</div>
                <Link href={'/theater-skit-across-nigeria/pages'} className="bg-green-600 rounded-[25px] flex flex-col justify-center items-center py-1 hover:bg-green-800 w-[150px] mt-[20px] text-white">Watch others</Link>
            </div>      
          </div>
     
        </Layout>
  )
}


// export async function getServerSideProps(context) {
//   const { params } = context;

//   const { id } = params;
//   await db.connect();
//   const skit = await Skits.findById(id ).lean();
//   await db.disconnect();
//   return {
//     props: {
//       skit: skit ? db.convertDocToObj(skit) : null,
//     },
//   };
// }


