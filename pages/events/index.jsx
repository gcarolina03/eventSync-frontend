import { useEffect, useState } from 'react'
import { GetEventsAPI } from '../../services/event.service'
import Card from '../../components/cardList/Card'
import Blur from '../../components/common/Blur'
import EventForm from '../../components/events/EventForm'
import { CalendarPlus } from '../../components/common/Icons'

function Events() {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)

  const getEvents = async () => {
   const res = await GetEventsAPI()
    setEvents(res.data)
  }

  const handleForm = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <>
      <div className='w-full h-full relative px-8 pt-10'>
        <p className='font-bold text-[30px]'>Your events</p>
        <hr className="m4-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
        <div className='mt-4 flex flex-wrap gap-8'>
          <div onClick={handleForm} className="bg-white border border-gray-200 relative items-center flex cursor-pointer justify-center rounded-lg h-[380px] w-[300px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div className='w-[90%] h-[92%] absolute bg-gray-300 text-white items-center p-4 text-center flex flex-col justify-center rounded-lg opacity-30'>
              <CalendarPlus className='fill-gray-500 mb-4' height='120' />
              <p className="text-gray-500 font-bold text-[30px]">Create a new event.</p>
            </div>
          </div>
          {events.length > 0 && 
            events.map((obj) => (
              <Card data={obj} />
            ))
          }
        </div>
        {showForm &&
        <>
          <Blur />
          <EventForm handleForm={handleForm}/>
        </>
        }
      </div>
    </>
  )
}

export default Events