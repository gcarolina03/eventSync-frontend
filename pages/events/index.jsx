import { useEffect, useState } from 'react'
import { GetEventsAPI } from '../../services/event.service'
import Card from '../../components/cardList/Card'

function Events() {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
   const res = await GetEventsAPI()
    setEvents(res.data)
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <div className='w-full h-[80%] px-8 pt-10'>
      <p className='font-bold text-[30px]'>Your events</p>
      <hr className="m4-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
      <div className='mt-4 flex wrap gap-8'>
        {events.length > 0 && 
          events.map((obj) => (
            <Card data={obj} />
          ))
        }
        <div class="bg-white border border-gray-200 relative items-center flex cursor-pointer justify-center rounded-lg h-[380px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className='w-[90%] h-[92%] absolute bg-gray-300 text-white items-center p-4 text-center flex flex-col justify-center rounded-lg opacity-30'>
            <svg xmlns="http://www.w3.org/2000/svg" class="fill-gray-500 mb-4" height="120" viewBox="0 0 512 512">
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
            </svg>
            <p class="text-gray-500 font-bold text-[30px]">Create a new event.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events