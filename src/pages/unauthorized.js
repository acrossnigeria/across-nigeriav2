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
      setRedirectMessage("Redirecting you to the Login Page...")
      router.push('/account/login') // change this to your desired path
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <Layout title="Unauthorized Login">
      <div style={{alignItems:'center'}} className='mx-auto flex flex-col h-screen text-center object-center'>
        <div style={{borderRadius:'25px'}} className='bg-gray-100 w-[fit-content] mt-[70px] p-[10px]'>
          <h1 className="text-[25px] font-bold text-gray-500 text-center">Oops! You can&apos;t access this page</h1>
          {message && <div className="mb-4 text-[20px] text-red-600 text-center">{message}</div>}
          {redirectMessage ? <p>{redirectMessage}</p>:
          <><p>If you are not redirected,</p>  
          <Link className='text-green-900' href="/account/login">Login Here</Link></>} 
        </div>
      </div>
    </Layout>
  );
}
