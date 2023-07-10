import { useEffect, useState } from 'react'
import { GetEventsAPI } from '../../services/event.service'
import Card from '../../components/cardList/Card'
import Blur from '../../components/common/Blur'
import EventForm from '../../components/events/EventForm'

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
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-gray-500 mb-4" height="120" viewBox="0 0 512 512">
                <path d="M184 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H96c-35.3 0-64 28.7-64 64v16 48V448c0 35.3 28.7 64 64 64H416c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H376V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H184V24zM80 192H432V448c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V192zm176 40c-13.3 0-24 10.7-24 24v48H184c-13.3 0-24 10.7-24 24s10.7 24 24 24h48v48c0 13.3 10.7 24 24 24s24-10.7 24-24V352h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V256c0-13.3-10.7-24-24-24z"/>
              </svg>
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