import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../../utils/error";
import Close from "../../../public/images/icon/Close";
import Loader from "@/components/Loader";
import EyeOpen from "../../../public/images/icon/EyeOpen";
import EyeClose from "../../../public/images/icon/EyeClose";
import logo1 from "../../../public/images/logo1.png";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ErrorCard from "@/components/ui/ErrorCard";

export default function LoginScreen() {
  const [ loading,setLoading ] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const sessionName = session?.user?? null;
  const [ showPassword, setShowPassword ] = useState(false);

  const [ showLoginError, setShowLoginError ] = useState(false);
  const [ loginError, setLoginError ] = useState('');

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

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  
  const submitHandler = async ({ email, password }) => {
    setLoading(true)
    try {

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        handleLoginError(result.error);
      }
    } catch (err) {
      handleLoginError(getError(err));
    }
    setLoading(false)
    if (session) {
      console.log(session)
      router.push(redirect || '/'); // Replace "/" with your desired page
    }
  };

  return (
    <div>
      <div className='flex flex-row justify-end absolute bg-gray-100 top-[3.5%] left-[3.5%]'>
          <Link href={'/'}><Close bg={'black'} size={'20px'}/></Link> 
      </div>
      <div className="h-screen w-screen mx-auto flex flex-col justify-start pt-[90px] items-center bg-gray-100 text-black ">
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
          <div className="mb-4">
            <label htmlFor="email" className="text-[17px] ml-2 mb-3">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Please enter your email',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Please enter valid email',
                },
              })}
              className="w-full border-gray-400 border-1 text-[16px] h-[40px] px-3 outline-none rounded-[5px] bg-gray-100"
              id="email"
            ></input> 
          </div>

          <div className="mb-2 ">
            <label htmlFor="password" className=" text-[17px] mb-3 ml-2 ">  Password</label>
            <div className="h-[40px] flex flex-row border-gray-400 px-3 border-1 rounded-[5px] bg-gray-100">
              <input
                type={showPassword?'text':'password'}
                placeholder="Password"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Please enter a valid password',
                  minLength: { value: 6, message: 'password is more than 5 chars' },
                })}
                className="w-full bg-gray-100 text-[16px] outline-none"
                id="password"
              ></input>
              <button type="button" style={{borderRadius:'5px', height:'45px'}}
                className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility1} >
                  {showPassword? <EyeOpen/>: <EyeClose/>}
              </button>
            </div>
          </div>
            {errors.password && (
              <div className="text-red-500 text-[13px] mt-2">❌{errors.password.message}</div>
            )}
            {errors.email && (
              <div className="text-red-500 text-[13px] mt-1">❌{errors.email.message}</div>
            )}
          <div className="mt-2">
            <Button type="button" onClick={handleSubmit(submitHandler)} className="w-[100%]" size="md" disabled={loading}>{loading?"Please wait...":"Log In"}</Button>
          </div>
          <div className="flex flex-row justify-center text-[16px] items-center gap-2 mt-[50px] mb-2">
            <span className="text-gray-500">Forgot password?</span>
            <Link href="/user/password-reset" className="hover:text-green-900 underline font-medium hover:scale-105">Click here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
