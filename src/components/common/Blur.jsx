import React from 'react'

function Blur({form}) {
  return (
    <div className='backdrop-blur-sm backdrop-grayscale flex items-baseline py-[100px] sm:py-0 sm:items-center justify-center absolute w-full min-h-screen h-full mt-[-70px] left-0 z-5 top-0'>{form}</div>
  )
}

export default Blur