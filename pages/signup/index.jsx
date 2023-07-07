import React from 'react'

function signup() {
  return (
    <div className="rounded-lg bg-white/30 border border-gray-300 bg-opacity-50 p-5 w-11/12 lg:w-2/5 xl:w-1/5 pt-[80px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  max-sm:px-8">
      <h1 className="text-3xl font-medium">Signup</h1>
      <p className="text-sm">Just some details to get you in.!</p>
      <form className="space-y-5 mt-5">
        <div className="w-full flex items-center gap-4">
          <input type="text" className="w-1/2 h-12 border border-gray-800 rounded px-3" placeholder="First Name*" />
          <input type="text" className="w-1/2 h-12 border border-gray-800 rounded px-3" placeholder="Last Name" />
        </div>
        <input type="text" className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Email*" />
        <input type="password" className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Password*" />
        <input type="password" className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Confirm Password*" />
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium">Signup</button>
      </form>

      <div className='flex flex-col items-center text-sm mt-[50px] gap-2'>
        <p className=''>Already Registered? <a href='/login' className='underline'>Login</a></p>
        <div className='flex gap-2 md:gap-4 '>
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  )
}

export default signup