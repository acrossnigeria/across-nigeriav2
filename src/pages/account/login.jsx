
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getError } from "../../../utils/error";
import Close from "../../../public/images/icon/Close";
import ProcessLoader from "@/components/ui/ProcessLoader";
import EyeOpen from "../../../public/images/icon/EyeOpen";
import EyeClose from "../../../public/images/icon/EyeClose";
import logo1 from "../../../public/images/logo1.png";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ErrorCard from "@/components/ui/ErrorCard";
import PadlockIcon from "../../../public/images/icon/PadlockIcon";
import TextInputWithIcon from "@/components/ui/TextInputWithIcon";
import EmailIcon from "../../../public/images/icon/EmailIcon";
import Loader from "@/components/Loader";
import setRealVH from "../../../utils/setRealVH";

export default function LoginScreen() {
  const [ loading, setLoading ] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const sessionName = session?.user?? null;
  const [ showPassword, setShowPassword ] = useState(false);

  const [ showLoginError, setShowLoginError ] = useState(false);
  const [ loginError, setLoginError ] = useState('');

  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleLoginError = (error) => {
    setShowLoginError(true);
    setLoginError(error);
  } 

  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };

  useEffect( () => {
    if ( sessionName === null ) {
        console.log(sessionName);
    }
    else {
      console.log(sessionName)
      router.push(redirect || '/');
    }
  }, [ router, sessionName, redirect ] );

  const handleSubmit = () => {
    if ( email === '' || password === '' ) {
      handleLoginError('Both field are required')
      return;
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
      handleLoginError('Please input a valid email address');
      return;
    }

    submitHandler( email, password);
  }
  
  const submitHandler = async (email, password ) => {
    setLoading(true)
    try {

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: redirect || '/',
      });

      if (result.error) {
        handleLoginError(result.error);
      }
    } catch (err) {
      handleLoginError(getError(err));
    }
    setLoading(false)
    if (session) {
      router.push(redirect || '/'); // Replace "/" with your desired page
    }
  };

  
  setRealVH();

  return (
    <div>
      <Loader/>
      <div className='flex flex-row justify-end absolute bg-gray-100 top-[3.5%] left-[3.5%]'>
          <Link href={'/'}><Close bg={'black'} size={'20px'}/></Link> 
      </div>
      <div style={{height:`calc(var(--vh, 1vh)*100)`}} className="h-screen w-screen mx-auto flex flex-col justify-start pt-[70px] items-center bg-gray-100 text-black ">
        <form className="mx-auto w-[93%] md:max-w-[350px] h-fit flex flex-col">
          <div className='text-center flex flex-row md:mb-10 mb-[80px] justify-center gap-1 items-center'>
            <Image src={logo1} alt='logo' placeholder='blur' className='h-[40px] w-[45px]' />
            <div className='flex flex-col justify-center leading-[15px] items-start'>
              <span className='text-[15px] font-bold text-green-700'>ACROSS NIGERIA</span>
              <span className='text-[13px] text-green-500'>REALITY SHOW</span>
            </div>
          </div>

          <div className="md:mb-4 mb-[30px]">
            <h1 className="text-[22px] font-bold mb-2 text-center">Welcome back!</h1>
            <div className="text-gray-500 text-center leading-[18px] text-[16px]">Don&apos;t have an account? 
              <Link className="underline text-black font-medium hover:scale-105"  href={`/account/reg?redirect=${redirect || '/'}`}> Create a new account now </Link> 
              Its FREE takes less than a minute.</div>
          </div>
          <ErrorCard setShowError={setShowLoginError} showError={showLoginError} error={loginError} />

          <TextInputWithIcon icon={<EmailIcon/>} placeholder="Email" label="Email" className="mb-4" value={email} onChange={(e) => { setShowLoginError(false); setEmail(e.target.value) }} id="email" type="email" />
          <TextInputWithIcon icon={<PadlockIcon/>} placeholder="Password" label="Password" className="mb-4" value={password} onChange={(e) => { setShowLoginError(false); setPassword(e.target.value) }} id="password" type={showPassword?'text':'password'} togglePasswordVisibility={togglePasswordVisibility1} showPassword={showPassword}> 
            <button type="button" style={{height:'100%'}} className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility1} >
                {showPassword? <EyeOpen/>: <EyeClose/>}
            </button>
          </TextInputWithIcon>

          <div className="mt-2">
            <Button type="button" onClick={handleSubmit} className="w-[100%]" size="md" disabled={loading}>{loading?<ProcessLoader/>:"Log In"}</Button>
          </div>
          <div className="flex flex-row justify-center text-[16px] items-center gap-2 md:mt-[40px] mt-[80px] mb-2">
            <span className="text-gray-500">Forgot password?</span>
            <Link href="/user/password-reset" className="hover:text-green-900 underline font-medium hover:scale-105">Click here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
