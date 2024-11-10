import { useContext, useEffect, useState, } from "react";
import { Store } from '../../utils/Store';
import Layout from '@/components/Layout'
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "next-share";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


export default function Success() { 
    const router =useRouter()
    const{data:session}=useSession();
    const[refCode, setRefCode]=useState("")
    const [url, setUrl]=useState();
  
   useEffect(()=>{
   const baseUrl=`${window.location.origin}/reg?ref=`
   const code= localStorage.getItem("refCode")
       if(code===""){
        const newcode=Cookies.get('refCode');
        setRefCode(newcode)
        console.log("ReFCODE IS :",refCode)
      }
     else{ setRefCode (code)}
  setUrl(baseUrl+refCode);
   const sendMail=async()=>{
   
    setUrl(baseUrl+Cookies.get('refCode'))
     const mUrl=baseUrl+Cookies.get('refCode');
  const outgoing="Across Nigeria <no-reply@acrossnig.com>";
        const recepient=userDetails[0]?.email?? session?.user.email?? 'unknown';;
        const subject=`Welcome to Across Nigeria Reality Show`;
        const heading=`Congratulations ${name} your Registration was Succesfull!`
        const content= `Dear ${name} kindly share the link with your friends ${mUrl} for a chance to win our mega prize as well as show them the way to financial freedom`;
        const mailResult= await axios.post('/api/mail/mail',{outgoing,
        recepient, subject, content,heading
      });
      console.log(mailResult)
        toast("Email was sent Successfully")}
        sendMail();
    },[])

  const { state} = useContext(Store);
  const {user:{userDetails},}= state;
  const name=userDetails[0]?.name?? session?.user.name?? 'unknown';
 
  return (
    <Layout><div className="p-14 justify-center">
      <div className="mx-auto justify-center origin-center object-center text-center">
     <div className="font-semibold mb-6" >Congratulations {name}</div>
     <div className="font-semibold mb-6" >Welcome to Across Nigeria</div>
     <div className="mb-4">You can now enjoy our Products</div>
     <div className='mx-auto justify-center object-center space-x-2 mb-3'>
      <p>Invite your friends with your Referal link below </p>
      <p className="font-semibold font-mono">{url}</p>
      <div><p className="font-semibold mb-4">Or share via Social Media</p></div>
    <FacebookShareButton url={url} quote={'Share to Facebook'}>
      <FacebookIcon size={30}  />
    </FacebookShareButton>
   <WhatsappShareButton url={url}><WhatsappIcon size={30}  quote={'Share to your whatsapp contacts'}/></WhatsappShareButton>
  <TwitterShareButton url={url}><TwitterIcon size={30}/></TwitterShareButton>
  <TelegramShareButton url={url}><TelegramIcon size={30}/></TelegramShareButton>
 </div>
     <div className="w-fit font-semibold mx-auto text-white px-4 py-2 mt-9 text-center rounded-md bg-green-800 hover:bg-green-900 active:bg-green-950" onClick={()=>(router.push('/'))}>Click to go Home</div>
     </div>
     </div>
    </Layout>
  )
}


