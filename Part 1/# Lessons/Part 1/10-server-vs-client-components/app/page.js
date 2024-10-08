import Link from 'next/link'

// 1. This is Server Component -> go to app/client/page.js
export default function Home() {
  console.log('Home') // -> check VS Code Terminal

  return (
    <div>
      <h1 className='text-5xl mb-8 font-bold'>Next.js Tutorial</h1>
      <Link href='/client' className='btn btn-accent'>
        get started
      </Link>
    </div>
  )
}
