import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Unauthorized() {
  const router = useRouter();
  const [redirectMessage, setRedirectMessage]=useState("")
  const { message } = router.query;
  useEffect(() => {
    // set a timer to redirect after 2 seconds
    const timer = setTimeout(() => {
      setRedirectMessage("Redirecting you to the Login Page")
      router.push('/login') // change this to your desired path
    }, 1000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <Layout title="Unauthorized Login">
      <div className='mx-auto h-screen self-center text-center text-2xl content-center object-center'>
        <h1 className="text-4l text-yellow-700 text-center">Access Denied!</h1>

        {message && <div className="mb-4 text-red-600 text-center">{message}</div>}
    {redirectMessage ? <p>{redirectMessage}</p>:
        <><p>If you are not redirected,</p>  
        <Link className='text-green-900' href="/login">Login Here</Link></>} 
      </div>
    </Layout>
  );
}
