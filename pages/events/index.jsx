import { useEffect, useState } from 'react'
import { GetEventsAPI } from '../../services/event.service'
import Card from '../../components/events/Card'
import Blur from '../../components/common/Blur'
import EventForm from '../../components/events/EventForm'
import { CalendarPlus } from '../../components/common/Icons'
import AddItem from '../../components/common/AddItem'

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
          <AddItem 
            onClick={handleForm} 
            text='Create a new event.' 
            icon={ <CalendarPlus className='fill-gray-500 mb-4' height='120' /> }
          />
          {events.length > 0 && 
            events.map((obj) => (
              <Card key={obj._id} data={obj} />
            ))
          }
        </div>
        {showForm &&
          <Blur form={ <EventForm handleForm={handleForm} />} />
        }
      </div>
    </>
  )
}

export default Events