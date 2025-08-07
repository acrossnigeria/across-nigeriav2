import Layout from '@/components/Layout'
import React from 'react'

const contact = () => {
  return (
   <Layout title="Contact Us">
     <div className="bg-white mt-6 rounded-lg mx-auto p-8 max-w-md w-full shadow-inner">
        <h1 className="text-3xl font-bold mb-6 text-green-700">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" className="mt-1 p-2 w-full border-1 border-gray-500 rounded-md" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 w-full border-1 border-gray-500 rounded-md" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type='tel' id="phone" name="phone" className="mt-1 p-2 w-full border-1 border-gray-500 rounded-md" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" rows="4" className="mt-1 p-2 w-full border-1 border-gray-500 rounded-md resize-none"></textarea>
          </div>
          <button type="submit" className="mx-auto text-center items-center object-center justify-center bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
        </form>
      </div>
   </Layout>
  )
}

export default contact
