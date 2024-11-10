import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";

export default function LoginScreen() {
    const[loading,setLoading]=useState(false);
 const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const sessionName=session?.user?? null

  useEffect(() => {
    if (sessionName===null) {
        console.log(sessionName)
          }
          else{
            console.log(sessionName)
            router.push(redirect || '/');
          }
  }, [router, sessionName, redirect]);

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
    <Layout title="Login">
     
      <div className="h-screen w-screen pt-11 mx-auto px-10 text-black ">
      <form className="mt-10 mx-auto rounded-md md:max-w-[500px]" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-8 font-bold text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="font-semibold text-sm">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full focus:outline-gray-600 h-10 px-2 rounded-md bg-gray-200 text-black"
            id="email"
            autoFocus
          ></input> 
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="font-semibold text-sm ">  Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more than 5 chars' },
            })}
            className="w-full h-10 focus:outline-gray-600 px-2 rounded-md bg-gray-200 text-black"
            id="password"
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-6 p-0">
         {loading?(<button disabled className="text-slate-100 text-3xl px-8 py-1 rounded-sm bg-green-500">Please Wait</button>):(<button className="text-slate-100 px-8 py-1 rounded-sm bg-green-800 hover:bg-green-900 active:bg-green-950">Login</button>)} 
         <span className="text-sm mx-8 mb-0 mt-8"><Link href="/passreset" className="mt-3">Forgot Password?</Link></span>
         </div> 
        <div className="mb-4 mt-6 text-sm font-semibold ">
          Don&apos;t have an account? &nbsp;
          <Link className="text-green-700 cursor-pointer hover:text-green-500"  href={`/reg?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </form></div>
    </Layout>
  );
};
