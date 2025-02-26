import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../../utils/error";
import { toast } from "react-toastify";
import Close from "../../../public/images/icon/Close";
import Loader from "@/components/Loader";
import EyeOpen from "../../../public/images/icon/EyeOpen";
import EyeClose from "../../../public/images/icon/EyeClose";

export default function LoginScreen() {
  const [ loading,setLoading ] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const sessionName = session?.user?? null;
  const [ showPassword, setShowPassword ] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };

  useEffect( () => {
    if (sessionName===null) {
        console.log(sessionName);
    }
    else{
      console.log(sessionName)
      router.push(redirect || '/');
    }
  }, [router, sessionName, redirect] );

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
      toast.error(result.error);
    }
  } catch (err) {
    toast.error(getError(err));
  }
  setLoading(false)
  if (session) {
    console.log(session)
    router.push(redirect || '/'); // Replace "/" with your desired page
  }
  };
  return (
    <div>
      <Loader/>
      <div className='flex flex-row justify-end bg-gray-100 px-8 py-3'>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div className="h-screen w-screen pt-11 mx-auto bg-gray-100 text-black ">
        <form className="mt-3 mx-auto w-[93%] md:max-w-[500px] flex flex-col" onSubmit={handleSubmit(submitHandler)}>
          <span className="mb-1 text-[25px]">Login</span>
          <span className="mb-10">Welcome back.</span>
          <div className="mb-4">
            <label htmlFor="email" className="text-[17px] ml-2 mb-3">Email</label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              {...register('email', {
                required: 'Please enter email',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: 'Please enter valid email',
                },
              })}
              className="w-full border-gray-400 border-1 h-[45px] px-3 outline-none rounded-[15px] bg-gray-200"
              id="email"
            ></input> 
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-6 ">
            <label htmlFor="password" className=" text-[17px] mb-3 ml-2 ">  Password</label>
            <div className="h-[45px] flex flex-row border-gray-400 px-3 border-1 rounded-[15px] bg-gray-200">
              <input
                type={showPassword?'text':'password'}
                {...register('password', {
                  required: 'Please enter password',
                  minLength: { value: 6, message: 'password is more than 5 chars' },
                })}
                className="w-full bg-gray-200 outline-none"
                id="password"
              ></input>
              <button type="button" style={{borderRadius:'5px', height:'45px'}}
                className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility1} >
                  {showPassword? <EyeOpen/>: <EyeClose/>}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="flex flex-row justify-end">
            <button className="text-[17px] hover:text-green-900 hover:scale-105"><Link href="/user/password-reset" className="mt-2 mr-2">Forgot Password?</Link></button>
          </div>
          <div className="mt-2">
            {loading?(<button disabled className="text-slate-100 h-[49px] animate-pulse w-[100%] text-[19px] py-1 rounded-[30px] bg-gray-500">Please Wait...</button>):(<button className="text-white w-[100%] h-[49px] rounded-[30px] bg-green-700 hover:bg-green-900 active:bg-green-950">Log In</button>)} 
          </div> 
          <div className="mb-4 mt-6 text-[17px] ">
            Don&apos;t have an account? &nbsp;
            <Link className="text-green-700 cursor-pointer underline hover:text-green-400"  href={`/account/reg?redirect=${redirect || '/'}`}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
