import React from 'react'
import Link from 'next/link'

const Page = () => {
  return (
    <div>
        <Link href = '../admin/signin'>Admin login</Link>
        <Link href = '../admin/signup'>Admin signup</Link>
    </div>
  )
}

export default Page