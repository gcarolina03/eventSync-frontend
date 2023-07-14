import { useEffect, useState } from "react"
import { DeleteEventAPI, GetEventAPI } from "../../../services/event.service"
import { useRouter } from 'next/router'
import { CalendarDays, Card, Clock, Pencil, TrashCan, User } from "../../../components/common/Icons"
import Blur from "../../../components/common/Blur"
import EventForm from "../../../components/events/EventForm"
import DeleteAlert from "../../../components/events/DeleteAlert"
import ResumeServices from "../../../components/events/ResumeServices"
import { formatDate } from "../../../lib/utils"
import GuestList from "../../../components/events/GuestList/GuestList"
import FormGuest from "../../../components/events/GuestList/FormGuets"

function ResumeEvent() {
  const router = useRouter()
  const { eventId } = router.query
  // DATA
  const [event, setEvent] = useState('')
	const [showEditForm, setShowEditForm] = useState(false)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const [showGuestList, setShowGuestList] = useState(false)

  const getEvent = async () => {
    const res = await GetEventAPI(eventId)
    setEvent(res.event)
  }

  useEffect(() => {
    getEvent()
  }, [])

	const handleEditForm = () => {
		setShowEditForm(!showEditForm)
	}

	const handleDelete = () => {
		setShowDeleteConfirm(!showDeleteConfirm)
	}

	const handleGuestList= () => {
		setShowGuestList(!showGuestList)
		console.log(showGuestList)
	}

	// DELETE EVENT SERVICE
  const DeleteEventService = async () => {
    const res = await DeleteEventAPI(eventId)
    if (res) {
      router.push('/events')
    }
  }

  return (
    event !== '' && (
			<div className='w-full h-full px-8 pt-10'>
				<div className="flex gap-8 items-center justify-between ">
					<p className='font-bold text-[30px]'>{event.title}</p>
					<div className="flex gap-2">
						{!showGuestList && (
							<>
								<div onClick={handleGuestList} className="cursor-pointer flex items-center px-4 h-8 py-2 text-sm font-bold text-center bg-[#ADE0E4] rounded-lg hover:bg-[#79AEB1]">
									Guest List
								</div>
								<Pencil onClick={handleEditForm} className="cursor-pointer gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-gray-300 hover:bg-gray-400 text-gray-700 px-4" />     
								<TrashCan onClick={handleDelete} className="cursor-pointer gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-red-300 hover:bg-red-400 text-red-700 px-4" />     
							</>
						) || (
							<>
								<div onClick={handleGuestList} className="cursor-pointer flex items-center px-4 h-8 py-2 text-sm font-bold text-center bg-[#ADE0E4] rounded-lg hover:bg-[#79AEB1]">
									Go Back
								</div>
								<Pencil className="cursor-pointer gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-gray-300 hover:bg-gray-400 text-gray-700 px-4" /> 
							</>
						)}
					</div>
				</div>
				<hr className="my-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
				<div className="grid grid-cols-4 w-full sm:grid-cols-12 gap-6">
					{/* INFO AREA */}
					<div className="col-span-4 sm:col-span-3 xl:col-span-2">
						<div className="p-6 flex flex-col justify-between h-full">
							<div className="flex flex-col">
								<div className="flex flex-col items-center">
									<img src={`${event.img_url}`} className="w-40 h-40 bg-gray-300 rounded-full mb-4 shrink-0" />
									<div className="mt-2flex flex-wrap gap-4 text-center">
										{event.eventRequests.map((request) => {
											if (request.serviceId.categoryId.title === 'Location') 
												return <span key={request._id}>{request.serviceId.cityId.postal_code}&nbsp; • &nbsp; {request.serviceId.cityId.name}</span>
											}
										)}
									</div>
								</div>
								<div className="flex flex-col mt-4 gap-2">
									<div className='flex gap-2 items-center justify-between text-gray-600 mb-1'>
										<p className="font-normal flex gap-2 items-center">
											<CalendarDays />
											Date
										</p>
										<p className="font-bold">{formatDate(event.event_date)} </p>
									</div>
									<div className='flex gap-2 items-center justify-between text-gray-600 mb-1'>
										<p className="font-normal flex gap-2 items-center">
											<Clock />
											Time
										</p>
										<p className="font-bold">{event.start_time}h - {event.end_time}h </p>
									</div>
									<div className='flex gap-2 items-center justify-between text-gray-600 mb-1'>
										<p className="font-normal flex gap-2 items-center">
											<User />
											Guests
										</p>
										<p className="font-bold">{event.guestList.reduce((acc, curr) => { return acc + curr.number }, 0)}</p>
									</div>
								</div>
							</div>
							<div className="bottom-5 flex flex-row text-xl justify-between">
								<p className="font-normal flex gap-2 text-gray-600 items-center">
									<Card />
									Total: 
								</p>
								<p className=" right-0 font-bold">{event.total_price} €</p>
							</div>
						</div>
					</div>
					<div className="col-span-4 relative sm:col-span-9 xl:col-span-10 p-6 pl-6 sm:pl-20">
          <div className="h-full min-h-[1em] hidden sm:block absolute left-0 w-px self-stretch bg-gradient-to-tr from-transparent via-gray-500 to-transparent opacity-20"></div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{!showGuestList ? 'Services' : 'Guest List'} </h2>
						{showGuestList && <FormGuest event={event._id} />}
          </div>
						{!showGuestList ? <ResumeServices event={event} /> : <GuestList list={event.guestList} />}
					</div>
					
				</div>
				{showEditForm &&
          <Blur form={ <EventForm handleForm={handleEditForm} event={event} />} />
        }
				{showDeleteConfirm &&
          <Blur form={ <DeleteAlert handleDelete={handleDelete} deleteEvent={DeleteEventService} />} />
        }
			</div>
		)
  )
}

export default ResumeEvent