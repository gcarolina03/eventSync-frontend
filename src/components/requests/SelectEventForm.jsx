import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import { XMark } from "../common/Icons"
import { GetEventsAPI } from "../../services/event.service"
import { formatDate } from "../../lib/utils"
import NoEvents from './NoEvents'
import { CreateRequestAPI } from '../../services/request.service'
import { useRouter } from 'next/router'

function SelectEventForm({ handleForm, service }) {
  const router = useRouter()
  const [events, setEvents] = useState('')
  const [search, setSearch] = useState('')

  const getEvents = async () => {
    const res = await GetEventsAPI()
    if(res) { setEvents(res.data) }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    getEvents()
  }, [])

  const filteredEvents = () => {
    const data = events.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
    return data
  }

  const createRequest = async (eventId) => {
    const res = await CreateRequestAPI(eventId ,service._id)
    if (res) {
      router.push(`/events/${eventId}`) 
    }
  }

  return (
    <>
    <div className="rounded-lg bg-white border border-gray-300 p-5 relative w-11/12 lg:w-2/5 xl:w-1/5 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
      {/* ------- CLOSE ICON ------- */}
      <div onClick={handleForm} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        <XMark className='h-6 w-6' /> 
      </div>
      {/* ------- TITLE FORM ------- */}
      <h1 className="text-3xl font-medium">Select your event...</h1>
      <p className="text-sm">Just need some details to send the request</p>

       {/* ------- SEARCH ------- */}
        <div className="my-2 p-1 bg-white flex border w-full border-gray-200 rounded">
          <div className="flex flex-auto flex-wrap"></div>
          <input onChange={handleSearch} value={search} placeholder="Search by title..." className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
        </div>
        {/* ------- LIST ------- */}
        <div className="shadow bg-white z-40 w-full overflow-y-auto h-[200px]">
        {events.length === 0 ? (
          <NoEvents />
        ) : (
        events.length > 0 &&         
          filteredEvents()
           .map((event) => (
            <div onClick={() => createRequest(event._id)} className="cursor-pointer items-center p-2 flex w-full border-gray-100 rounded-t border-b hover:bg-[#C2C5FF] hover:bg-opacity-80">
              <div className="mx-2 mt-1">
                {event.title}
                <div className="text-xs truncate w-full normal-case font-normal mt-1 text-gray-500">
                  {formatDate(event.event_date)} / {event.start_time}h - {event.end_time}h
                </div>
              </div>
            </div> 
          ))
        )}
        </div>
      </div>
    </>
  )
}

// props validation
SelectEventForm.propTypes = {
  handleForm: PropTypes.func,
  service: PropTypes.object,
}

export default SelectEventForm