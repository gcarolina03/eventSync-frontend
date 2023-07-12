import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ArrowRightFromBracket, Bars, CircleUser } from './Icons'


function UserMenu({ user, handleShow, menu }) {
  const router = useRouter()

  const logOut = () => {
    localStorage.removeItem('token')
    router.push('/')
    window.location.href = window.location.origin
  }

  return (
    <>
      <div className="flex items-center md:order-2 relative">
        <button type="button" className="flex px-3 border border-white text-white py-2 mr-2 gap-2 items-center text-sm rounded-full" onClick={handleShow}>
          <span className="sr-only">Open user menu</span>
          <Bars className='h-4' />
          <CircleUser className='h-5' />
        </button>
        {/* <!-- Dropdown menu --> */}
        <div className={`z-50 ${menu ? '' : 'hidden'} absolute top-5 right-2 my-4 text-base list-none bg-white rounded-lg shadow`}>
          <p className='px-4 py-3 mt text-xs'>Currently in</p>
          <div className="px-4 py-3 flex flex-row gap-4 w-[250px]">
            <img className="w-10 h-10 rounded-full" src={`${user.img_url}`} alt="user avatar" />
            <div className=''>
              <span className="block font-bold">{user.first_name} {user.last_name}</span>
              <span className="block text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
          <ul className="py-2">
            <li>
              <a href="/profile" className="block px-4 py-2 font-bold hover:text-primary">Profile</a>
            </li>
            <li>
              <a href="/events" className="block px-4 py-2 font-bold hover:text-primary">My Events</a>
            </li>
            <li>
              <a href="/profile/services" className="block px-4 py-2 font-bold hover:text-primary">My Services</a>
            </li>
            <hr className="h-0.5 border-t-0 mx-2 bg-neutral-300" />
            <li>
              <div onClick={() => logOut()} className="cursor-pointer px-4 py-2 flex flex-row justify-between font-bold text-red-500 hover:text-red-600">Logout 
                <ArrowRightFromBracket />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

// props validation
UserMenu.propTypes = {
  user: PropTypes.object,
  handleShow: PropTypes.func,
  menu: PropTypes.bool
}

export default UserMenu