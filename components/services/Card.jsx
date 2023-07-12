import PropTypes from 'prop-types'
import { ArrowRight, CalendarDays, Clock, Pencil, User } from '../common/Icons'
import Link from 'next/link'
import { formatDate } from '../../lib/utils'

function Card({ data, edit }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg relative h-[380px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
        <div onClick={() => edit(data)} className="cursor-pointer absolute top-[-10px] left-[-10px] gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-gray-300 hover:bg-gray-400 text-gray-700 px-4">
          <Pencil /> 
        </div>
        <div className='px-3 text-sm py-1 bg-gray-600 text-white font-bold top-2 right-2 rounded-lg absolute opacity-80'>{data.categoryId.title}</div>
        <img className="rounded-t-lg w-full h-full object-cover mx-auto" src={`${data.img_url}`} alt="" />
      </div>
      <div className="p-5">
          <h5 className=" text-lg font-bold tracking-tight">{data.title}</h5>
          <div className='flex gap-2 items-center text-gray-600 mb-4'>
            {data.cityId.postal_code}&nbsp; • &nbsp;{data.cityId.name}
          </div>
          
          {data.min_capacity && data.max_capacity &&
            <div className='flex gap-2 items-center text-gray-600'>
              <User />
              <p className="font-normal">from {data.min_capacity} to {data.max_capacity}</p>
            </div>
          }
          {data.start_time && data.end_time &&
            <div className='flex gap-2 items-center text-gray-600'>
              <Clock />
              <p className="font-normal">{data.start_time}h - {data.end_time}h </p>
            </div>
          }
      </div>
      {/* <Link href={`/profile/services/${data._id}`} className="absolute right-4 bottom-4 inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white bg-light rounded-lg hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark">
          Request
          <ArrowRight className='w-3.5 h-3.5 ml-2' />
      </Link> */}
    </div>
  )
}

// props validation
Card.propTypes = {
  data: PropTypes.object,
  edit: PropTypes.func,
}

export default Card