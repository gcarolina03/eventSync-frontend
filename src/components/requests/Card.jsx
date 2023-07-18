import React, { useEffect, useState } from 'react'
import { Clock, User } from '../common/Icons'
import { getAddressFromLatLng } from '../../services/api'

function CardRequest({ request }) {
  const [location, setLocation] = useState('')

  const getAddress = async () => {
    const res = await getAddressFromLatLng(request.serviceId.latitude, request.serviceId.longitude)
    if (res) {
      setLocation(res)
    }
  }

  useEffect(() => {
    getAddress()
  }, [])

  return (
    <div className="bg-white border border-gray-200 rounded-lg relative h-[400px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
        <div className='px-3 text-sm py-1 bg-gray-600 text-white font-bold top-2 left-2 rounded-lg absolute opacity-80'>{request.serviceId.categoryId.title}</div>
        <div className='px-3 text-lg py-1 bg-neutral-100 text-black font-bold bottom-2 right-2 rounded-lg absolute opacity-80'>{request.serviceId.price} €</div>
        <img className="rounded-t-lg w-full h-full object-cover mx-auto" src={`${request.serviceId.img_url}`} alt="" />
      </div>
      <div className="p-5">
        <h5 className=" text-lg font-bold tracking-tight">{request.serviceId.title}</h5>
        <div className='flex gap-2 items-center text-gray-600 mb-4'>
          {location.length > 0 &&
           <span>{location[6].long_name}&nbsp; • &nbsp; {location[2].long_name}</span>
          }
        </div>
        
        {request.serviceId.min_capacity && request.serviceId.max_capacity &&
          <div className='flex gap-2 items-center text-gray-600'>
            <User />
            <p className="font-normal">from {request.serviceId.min_capacity} to {request.serviceId.max_capacity}</p>
          </div>
        }
        {request.serviceId.start_time && request.serviceId.end_time &&
          <div className='flex gap-2 items-center text-gray-600'>
            <Clock />
            <p className="font-normal">{request.serviceId.start_time}h - {request.serviceId.end_time}h </p>
          </div>
        }
      </div>
      <div>
        <div className={`absolute right-4 bottom-3 inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white rounded-lg focus:outline-none ${request.state === 'pending' ? 'bg-yellow-700' : request.state === 'confirmed' ? 'bg-green-700' : 'bg-red-800'}`}>
          {request.state.charAt(0).toUpperCase() + request.state.slice(1)}
        </div>
      </div>
    </div>
  )
}

export default CardRequest