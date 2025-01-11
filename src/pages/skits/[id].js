"use client"
import Layout from "@/components/Layout";
import Skits from "@/models/Skits";
import { useRouter } from "next/router";
import db from "../../../utils/db";
import { toast } from "react-toastify";
import { getError } from "../../../utils/error";
import axios from "axios";
import 'next-cloudinary/dist/cld-video-player.css';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import PaystackBtn from "@/components/PaystackBtn";
import InfoIcon from "../../../public/images/icon/InfoIcon";
import ContestIcon from "../../../public/images/icon/ContestIcon";
import Profile from "../../../public/images/icon/Profile";
import Close from "../../../public/images/icon/Close";
import CycleLoader from "@/components/CycleLoader";

export default function SkitScreen(props){
  const {skit}=props;
  const { query } = useRouter();
  const router= useRouter();
  const [amount, setAmount] = useState('');
  const [payment, setPayment] = useState(0);
  const [email, setEmail] = useState('');
  const[loadPay, setLoadPay]=useState(false);
  const[loadVote, setLoadVote]=useState(false);

  const[isMobile, setIsMobile]=useState(false);
  useEffect(()=>{
    if(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)&&window.matchMedia("(max-width: 600px)").matches){
    setIsMobile(true)
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
      
    const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send payment to server
    console.log(`Payment processed for ${payment} Naira`);
    setLoadPay(true)
  };
  const voteHandler=async()=>{
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

  return(
        <Layout title={skit.title}>
          <div className={`flex mt-[20px] rounded-[20px] justify-center items-center gap-4 ${isMobile?'flex-col':'flex-row mx-[5%]'}`}>
            <div className={`bg-gray-100 rounded-[7px] ${isMobile?'w-[90%] flex justify-center items-center':''}`}>
              <ReactPlayer width={isMobile?'270px':'400px'} height={isMobile?'350px':'510px'} url={skit.url} controls={true} pip={true} />
            </div>
            <div>    
              <form onSubmit={handleSubmit} className={` min-h-[510px] border-t-1 ${isMobile?'border-gray-400 rounded-t-[20px]':''} p-4 max-w-md mx-auto`}>
                <div className="flex flex-row items-center gap-2"><Profile/>{skit.name}</div>
                <div className="flex flex-col mb-[10px] gap-1">
                  <span style={{lineHeight:'25px'}} className="text-[25px] font-extrabold">{skit.title}</span>
                  <span style={{lineHeight:'20px'}} className="text-[20px]">{skit.description}</span>
                </div>
                  
                <div className="inline-flex gap-2 items-center"><ContestIcon/>contesting for best Skit in Skits Across Naija</div>
                <h2 className="text-[18px] mb-1 text-green-600 mt-6 ml-3">You can help it win by voting. Make a vote ?</h2>
                <div className="text-[14px] inline-flex gap-2 bg-green-200 p-2 rounded-[15px]"><InfoIcon/> Each vote costs &#8358;100, you can send as many Votes as possible</div>

                <label htmlFor="email" className="block text-[16px] mt-3 font-semibold mb-1 ml-2">Kindly enter your email:</label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} className="border rounded-[15px] border-gray-300 h-[48px] px-3 mb-3 w-full" required/>

                <label className="block text-[16px] font-semibold mb-1 ml-2" htmlFor="amount">Enter Number of Votes:</label>
                <input type="number" max={10000} min={1} id="amount" name="amount" className="border rounded-[15px] h-[48px] border-gray-300 px-3 mb-3 w-full" value={amount.toLocaleString()} onChange={handleChange} pattern="\d*" title="Please enter only numbers" required/>

                {amount && <button className={`${isMobile?'w-[100%]':''} bg-green-700 text-white font-semibold h-[50px] hover:bg-green-900 rounded-[30px] cursor-pointer px-4 mx-auto`}
                type="submit">Vote with &#8358;{payment.toLocaleString()} Naira
                </button>} 
              </form>

              <div>
                {loadPay && (
                  <div className="fixed w-screen h-screen top-0 left-0 z-[5000] flex flex-col items-center justify-center bg-black bg-opacity-50">
                    <button className="p-3 fixed z-[6000] top-[5%] right-[5%] rounded-full bg-gray-100" onClick={()=>(setLoadPay(false))}>
                      <Close/>
                    </button>
                    <PaystackBtn pay={voteHandler} amount={payment} email={email} purpose={`Vote for ${skit.title}`}/>
                  </div>
                )}

                {loadVote && (
                  <div className="fixed inset-0 top-0 h-screen flex flex-col justify-center ite gap-2  w-screen z-50 left-0 bg-opacity-85 bg-slate-950 text-gray-200 pt-56">
                    <CycleLoader/>
                    wait while we collate your votes
                  </div>
                )}
              </div>       
            </div>
          </div>
     
        </Layout>
  )
}


export async function getServerSideProps(context) {
  const { params } = context;

  const { id } = params;
  await db.connect();
  const skit = await Skits.findById(id ).lean();
  await db.disconnect();
  return {
    props: {
      skit: skit ? db.convertDocToObj(skit) : null,
    },
  };
}


