import React from 'react'

function AddItem({onClick, icon, text}) {
  return (
    <div onClick={onClick} className="bg-white border border-gray-200 relative items-center flex cursor-pointer justify-center rounded-lg h-[400px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className='w-[90%] h-[92%] absolute bg-gray-300 text-white items-center p-4 text-center flex flex-col justify-center rounded-lg opacity-30'>
        {icon}
        <p className="text-gray-500 font-bold text-[30px]">{text}</p>
      </div>
    </div>
  )
}

export default AddItem