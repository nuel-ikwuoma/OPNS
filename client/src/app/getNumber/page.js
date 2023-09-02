'use client';
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
const Page = () => {
  const [phone, setPhone] = React.useState('')
  return (
    <main className=' bg-gradient-to-tr from-white to-blue-50 flex flex-col items-center justify-center h-full gap-2 p-0'>
      <section className='flex flex-col max-w-md h-full sm:h-2/3 w-full sm:w-[28rem] justify-center items-center shadow-xl bg-white border sm:rounded-2xl px-6'>
        <label htmlFor="phone" className='text-lg w-full'>Phone Number</label>
     <input type="text" className=' py-4 text-xl rounded-lg w-full border-2 border-black' value={phone} onChange={(e) => setPhone(e.target.value)} />
</section>    </main>
  )
}

export default Page