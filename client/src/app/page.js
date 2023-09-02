import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <main className=' bg-gradient-to-tr from-white to-blue-50 h-full flex items-center justify-center'>
      <section className='flex gap-12'>
        <Link href="/getNumber" className='px-6  text-center bg-white py-4 rounded shadow-lg'>Get Number</Link>
        <Link href="/addNumber" className='px-6  text-center py-4 bg-blue-500 text-white rounded shadow-lg'>Add Number</Link>
      </section>
    </main>
  )
}

export default Page