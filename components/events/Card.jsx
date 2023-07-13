import PropTypes from 'prop-types'
import { ArrowRight, CalendarDays, Clock, User } from '../common/Icons'
import Link from 'next/link'
import { formatDate } from '../../lib/utils'

function Card({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg relative h-[400px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="bg-[#9CC0FA] rounded-t-lg relative h-[180px]">
        <div className='px-3 py-1 bg-gray-600 text-white font-bold top-2 right-2 rounded-lg absolute opacity-80'>{data.total_price} €</div>
        <img className="object-cover rounded-t-lg w-full h-full mx-auto" src={`${data.img_url}`} alt="" />
      </div>
      <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">{data.title}</h5>
          <div className='flex gap-2 items-center text-gray-600 mb-1'>
            <CalendarDays />
            <p className="font-normal">{formatDate(data.event_date)} </p>
          </div>
          
          <div className='flex gap-2 items-center text-gray-600 mb-1'>
            <Clock />
            <p className="font-normal">{data.start_time}h - {data.end_time}h </p>
          </div>

          <div className='flex gap-2 items-center text-gray-600'>
            <User />
            <p className="font-normal">0</p>
          </div>
      </div>
      <Link href={`/events/${data._id}`} className="absolute right-4 bottom-4 inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white bg-light rounded-lg hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark">
          See
          <ArrowRight className='w-3.5 h-3.5 ml-2' />
      </Link>
    </div>
  )
}

// props validation
Card.propTypes = {
  data: PropTypes.object,
}

export default Card