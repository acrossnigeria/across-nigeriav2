import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

function soon() {
  return (

<Layout><div className='h-[100vh] w-screen mx-auto  mt-0 -z-10 top-0 left-0 bottom-0 mb-0 bg-gray-900 bg-opacity-80 '>
      <div className=' relative text-3xl md:text-5xl text-center pt-36 align-middle lg:text-6xl animate-bounce '>
        Coming Soon
      </div>
      <Link href="/"><div className='primary-button text-white font-serif font-semibold text-center'>Return to Home</div></Link>
      </div>
    </Layout>
  )
}

export default soon
