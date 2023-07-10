import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { GetProfileAPI } from '../../services/user.service';
import UserMenu from './UserMenu';

function Navbar() {
  const router = useRouter()
  const path = router.pathname
  const [user, setUser] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  function changeShowMenu () {
    return setShowMenu(!showMenu)
  }

  const getUser = async () => {
    const res = await GetProfileAPI()
    setUser(res)
  }

  useEffect(() => {
    getUser()
  }, [])


  return (
    <>
    <nav className="bg-primary fixed w-full z-10">
      <div className="flex flex-wrap justify-between items-center mx-auto width-full py-4 px-1 sm:px-4">
        <img src="../images/logo.png" className="h-8 mx-3" alt="EventSync Logo" />
        <div className="justify-between items-center flex lg:w-auto">
          <ul className="flex font-medium flex-row gap-2 sm:gap-6 items-center">
            <li>
              <Link href="/" className={`block py-2 ${path === '/' ? 'text-white cursor-default' : 'text-gray-400 hover:text-light'} rounded bg-transparent font-bold`} aria-current="page">Home</Link>
            </li>
            <div className="inline-block h-[20px] w-0.5 bg-neutral-100 opacity-40"></div>
            <li>
              <Link href="/services" className={`block py-2 ${path === '/services' ? 'text-white cursor-default' : 'text-gray-400 hover:text-light'} font-bold`}>Services</Link>
            </li>
            {user &&
              <>
                <div className="h-[20px] hidden sm:inline-block  w-0.5 bg-neutral-100 opacity-40"></div>
                <li className='hidden sm:block'>
                  <Link href="/events" className={`py-2 block ${path === '/events' ? 'text-white cursor-default' : 'text-gray-400 hover:text-light'} font-bold`}>Events</Link>
                </li>
              </>
            }
          </ul>
        </div>
        <div className="flex items-center flex-row gap-4 sm:mr-6">
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
            <UserMenu user={user} handleShow={changeShowMenu} menu={showMenu}/>
          }
        </div>
      </div>
    </nav>
   </>




  )
}

export default Navbar