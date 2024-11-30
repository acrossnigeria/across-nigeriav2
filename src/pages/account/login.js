import Layout from "@/components/Layout";
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
  const[loading,setLoading]=useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const sessionName=session?.user?? null
  const [showPassword, setShowPassword] = useState(false);

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
      <div className='flex flex-row justify-end px-8 py-3'>
          <Link href={'/'}><Close/></Link> 
      </div>
      <div className="h-screen w-screen pt-11 mx-auto px-10 text-black ">
        <div className='border-b-1 border-green-100 py-3 text-center text-[17px] font-bold text-green-600'>
          <span>ACROSS NIGERIA REALITY SHOW</span>
        </div>
        <form className="mt-10 mx-auto rounded-md md:max-w-[500px]" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="mb-8 font-bold text-xl">Login</h1>
          <div className="mb-4">
            <label htmlFor="email" className="font-semibold text-sm">Email</label>
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
              className="w-full text-[19px] focus:outline-gray-600 h-[49px] px-2 rounded-md bg-gray-200 text-black"
              id="email"
              autoFocus
            ></input> 
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-6 ">
            <label htmlFor="password" className=" text-[17px] mb-[5px] ">  Password</label>
            <div className="bg-gray-200 h-full flex flex-row rounded-[5px]">
              <input
                type={showPassword?'text':'password'}
                {...register('password', {
                  required: 'Please enter password',
                  minLength: { value: 6, message: 'password is more than 5 chars' },
                })}
                className="w-full h-[49px] focus:outline-none px-2 rounded-md bg-gray-200 text-black"
                id="password"
              ></input>
              <button type="button" style={{borderRadius:'5px', height:'49px'}}
                className={`right-0 px-[5px] w-fit` } onClick={togglePasswordVisibility1} >
                  {showPassword? <EyeOpen/>: <EyeClose/>}
              </button>
            </div>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="flex flex-row justify-between">
          <button className="text-[16px] rounded-[5px] h-[49px] hover:bg-green-700 hover:border-none hover:text-white text-green-700 border-1 border-green-700 w-[48%]"><Link href="/user/passreset" className="mt-3">Forgot Password?</Link></button>
          {loading?(<button disabled className="text-slate-100 h-[49px] animate-pulse w-[48%] text-[19px] py-1 rounded-sm bg-yellow-500">Please Wait...</button>):(<button className="text-white w-[48%] h-[49px] rounded-[5px] bg-green-700 hover:bg-green-900 active:bg-green-950">Login</button>)} 
          </div> 
          <div className="mb-4 mt-6 text-[16px] font-semibold ">
            Don&apos;t have an account? &nbsp;
            <Link className="text-green-700 cursor-pointer underline hover:text-green-400"  href={`/account/reg?redirect=${redirect || '/'}`}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
