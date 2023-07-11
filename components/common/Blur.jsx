import React from 'react'

function Blur({form}) {
  return (
    <div className='backdrop-blur-sm backdrop-grayscale flex items-center justify-center absolute w-full min-h-screen h-full mt-[-70px] left-0 z-5 top-0'>{form}</div>
  )
}

export default Blur