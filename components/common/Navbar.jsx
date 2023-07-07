import Link from 'next/link'
import { useRouter } from 'next/router'

function Navbar() {
  const router = useRouter()
  const path = router.pathname

  return (
   <>
    <nav className="bg-primary">
      <div className="flex flex-wrap justify-between items-center mx-auto width-full p-4">
        <a href="/" className="flex items-center">
          <img src="../images/logo.png" className="h-8 mx-3" alt="EventSync Logo" />
        </a>
        <div className="flex items-center">
          {path === '/login' &&
            <Link href='/signup'>
              <div className="text-white border cursor-pointer border-white font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-dark hover:border-dark">Signup</div>
            </Link>
          || path === '/signup' &&
            <Link href='/login'>
              <div className="text-white border cursor-pointer border-white font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-dark hover:border-dark">Login</div>
            </Link>
          ||
            <Link href='/login'>
              <div className="text-white border cursor-pointer border-white font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-dark hover:border-dark">Login</div>
            </Link>
          }
        </div>
      </div>
    </nav>
   </>

  )
}

export default Navbar