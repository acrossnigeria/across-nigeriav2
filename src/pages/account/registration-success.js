import { useContext, useEffect, useState, } from "react";
import { Store } from "../../../utils/Store";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "next-share";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import logo1 from "../../../public/images/logo1.png";
import Image from 'next/image';
import registerIllus from "../../../public/images/illustration/flagged.svg";
import Button from "@/components/ui/Button";


export default function Success() { 
  const router = useRouter()
  const { data:session } = useSession();
  const [ refCode, setRefCode ] = useState("");
  const [ url, setUrl ] = useState();
  const [ modalHeight, setModalHeight ] = useState('h-[0px]');
  const [ modalOpacity, setModalOpacity ] = useState('opacity-[0px]')

  const sendMail = async () => {
    setUrl(baseUrl+Cookies.get('refCode'))
    const mUrl = baseUrl+Cookies.get('refCode');
    const outgoing="Across Nigeria <no-reply@acrossnig.com>";
    const recepient=userDetails[0]?.email?? session?.user.email?? 'unknown';;
    const subject =`Welcome to Across Nigeria Reality Show`;
    const heading =`Congratulations ${name} your Registration was Succesfull!`;
    const content = `Dear ${name} kindly share the link with your friends ${mUrl} for a chance to win our mega prize as well as show them the way to financial freedom`;

    const mailResult = await axios.post('/api/mail/mail',{outgoing, recepient, subject, content,heading });
    console.log(mailResult)
  }
  
  useEffect(()=>{
    const baseUrl = `https://acrossnig.com/account/reg?ref=`;
    const code = localStorage.getItem("refCode");

    if ( code === "" ) {
      const newcode=Cookies.get('refCode');
      setRefCode(newcode)
    } else { 
      setRefCode(code)
    }

    setUrl(baseUrl+refCode);


    // sendMail(baseUrl);
    
    },[]);

    useEffect(()=>{
      setTimeout(() => {
        setModalHeight('h-[80%]');
        setModalOpacity('opacity-100');
      }, 1000);
    }, [])

  const { state} = useContext(Store);
  const {user:{userDetails},}= state;
  const name  =userDetails[0]?.name?? session?.user.name?? 'unknown';
 
  return (
    <div className="h-screen w-[100%] flex flex-col bg-white">
      <div className="h-[20%] flex flex-col items-center justify-end pb-[25px]">
        <div className='text-center flex flex-row justify-center gap-1 items-center'>
          <Image src={logo1} alt='logo' placeholder='blur' className='h-[45px] w-[50px]' />
          <div className='flex flex-col justify-center items-start'>
            <span className='text-[16px] font-bold text-green-700'>ACROSS NIGERIA</span>
            <span className='text-[14px] text-green-500'>REALITY SHOW</span>
          </div>
        </div>
      </div>
     
      <div className={`${modalHeight} ${modalOpacity} transition-all duration-500 ease-in-out overflow-hidden pt-[15px] mt-auto rounded-t-[10px] border-t-1 border-t-gray-500 bg-gray-100`}>
        <div className="mx-auto text-center">
          <div className="font-bold text-[22px] mb-2" >Congratulations {name}</div>
          <div className="font-semibold text-[19px]" >Welcome!</div>
          <div className="mb-4">You can now enjoy our Products</div>
          <Image src={registerIllus} className="h-[120px] mx-auto mt-[10px] md:w-[200px] w-[75%]"/>
          <div className='mx-auto justify-center object-center mt-[15px] space-x-2 mb-3'>
            <p>Invite your friends with your Referal link below </p>
            <p className="font-semibold underline font-mono">{url}</p>
            <div><p className="mb-4">Or share via Social Media</p></div>
            <FacebookShareButton url={url} quote={'Share to Facebook'}><FacebookIcon size={30}  /> </FacebookShareButton>
            <WhatsappShareButton url={url}><WhatsappIcon size={30}  quote={'Share to your whatsapp contacts'}/></WhatsappShareButton>
            <TwitterShareButton url={url}><TwitterIcon size={30}/></TwitterShareButton>
            <TelegramShareButton url={url}><TelegramIcon size={30}/></TelegramShareButton>
          </div>
          <Button size={'md'} className="w-[80%] md:w-[250px] mx-auto" onClick={()=>(router.push('/'))}>Go Home</Button>
        </div>
      </div>
    </div>
  )
}


