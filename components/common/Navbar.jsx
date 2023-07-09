import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { GetProfileAPI } from '../../services/user.service';

function Navbar() {
  const router = useRouter()
  const path = router.pathname
  const [user, setUser] = useState(null)

  const getUser = async () => {
    const res = await GetProfileAPI()
    setUser(res)
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <>
    <nav className="bg-primary">
      <div className="flex flex-wrap justify-between items-center mx-auto width-full py-4 px-1 sm:px-4">
        <div className='flex flex-row align-center'>
        <img src="../images/logo.png" className="h-8 mx-3" alt="EventSync Logo" />
        <div class="justify-between items-center flex lg:w-auto">
          <ul class="flex font-medium flex-row gap-2 sm:gap-6">
            <li>
              <a href="/" class="block py-2 text-white rounded bg-transparent" aria-current="page">Home</a>
            </li>
            <li>
              <a href="#" class="block py-2 text-gray-400 hover:text-light">Services</a>
            </li>
            {user &&
              <li>
                <a href="#" class="block py-2 text-gray-400 hover:text-light">Events</a>
              </li>
            }
          </ul>
        </div>
        </div>
        <div className="flex items-center flex-row gap-4">
          {!user &&
            <>
              <Link href='/signup'>
                <div className="text-white border cursor-pointer font-bold border-white rounded-lg text-sm px-5 py-2.5 mr-1 lg:mr-2 mb-2 hover:bg-dark hover:border-dark">Signup</div>
              </Link>
              <Link href='/login'>
                <div className="text-primary hidden sm:block border cursor-pointer border-white[100] bg-white font-bold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 hover:bg-dark hover:border-dark hover:text-white">Login</div>
              </Link>
            </>
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