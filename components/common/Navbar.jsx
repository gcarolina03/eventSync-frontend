import React from 'react'

function Navbar() {
  return (
   <>
    <nav className="bg-primary">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4">
        <a href="/" className="flex items-center">
          <img src="../images/logo.png" className="h-8 mr-3" alt="EventSync Logo" />
        </a>
        <div className="flex items-center">
          <button type="button" class="text-white border border-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:hover:bg-dark hover:border-dark">Login</button>
        </div>
      </div>
    </nav>
   </>

  )
}

export default Navbar