import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

function soon() {
  return (
  <Layout>
  <div className='h-[100vh] w-screen mx-auto  mt-0 -z-10 top-0 left-0 bottom-0 mb-0 bg-gray-900 bg-opacity-20 '>
      <div className='mb-7 text-3xl md:text-5xl font-bold text-pretty text-green-700 text-center pt-36 align-middle lg:text-5xl '>
        Coming Soon...
      </div>
      <Link href="/">
        <div className='primary-button flex gap-2 w-56 text-white font-sans font-semibold text-center'>
          Return Home
          </div>
      </Link>
  </div>
  </Layout>
  )
}

export default soon
