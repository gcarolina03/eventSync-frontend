import PropTypes from 'prop-types'
import { useRouter } from 'next/router'


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
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" className='h-4' fill="currentColor" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className='h-5' height="1em" fill="currentColor" viewBox="0 0 512 512">
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
          </svg>
        </button>
        {/* <!-- Dropdown menu --> */}
        <div className={`z-50 ${menu ? '' : 'hidden'} absolute top-5 right-2 my-4 text-base list-none bg-white rounded-lg shadow`}>
          <p className='px-4 py-3 mt text-xs'>Currently in</p>
          <div className="px-4 py-3 flex flex-row gap-4 w-[250px]">
            <img className="w-10 h-10 rounded-full" src={`${process.env.baseURL}/${user.img_url}`} alt="user avatar" />
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 512 512">
                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
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