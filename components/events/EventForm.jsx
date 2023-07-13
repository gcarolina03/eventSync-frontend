import PropTypes from 'prop-types'
import { useState } from 'react'
import { CreateEventAPI, UpdateEventAPI } from '../../services/event.service'
import ErrorMsg from '../common/ErrorMsg'
import { XMark } from '../common/Icons'
import { formatDate } from '../../lib/utils'
import { useRouter } from 'next/router'

function EventForm({ handleForm, event }) {
  const router = useRouter()
  // DATA
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)
  const [editStatus, setEditStatus] = useState(false)

  // TITLE
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const validationTitle = () => {
    return (title.length > 4)
  }

  // DATE
  const handleDate = (e) => {
    setDate(e.target.value)
  }

  const validationDate = () => {
    const today = new Date();
    const event = new Date(date)

    return (event > today)
  }

  // START
  const handleStart = (e) => {
    setStart(e.target.value)
  }

  // END
  const handleEnd = (e) => {
    setEnd(e.target.value)
  }

  const validationEnd = () => {
    return (start < end)
  }

  // CREATE EVENT SERVICE
  const CreateEventService = async () => {
    const res = await CreateEventAPI(title, date, start, end)
    if (res) {
      window.location.href = window.location.href
    }
  }

  // UPDATE DATE IF EVENT IN PARAMS
  const updateData = () => {
    if (event) {
      setTitle(event.title)
      setDate(formatDate(event.event_date))
      setStart(event.start_time)
      setEnd(event.end_time)
      setEditStatus(true)
    }
  }

  useState(() => {
    updateData()
  }, [event])

  // HANDLE DATA TO UPDATE
  const dataToSend = () => {
    let data = {}
    if(title !== event.title && title !== '' && validationTitle()) data.title = title
    if(date !== formatDate(event.event_date) && date !== '' && validationDate()) data.event_date = date
    if(start !== event.start_time && start !== '') data.start_time = start
    if(end !== event.end_time && end !== '' && validationEnd()) data.end_time = end
    return data
  }

  // EDIT EVENT SERVICE
  const UpdateEventService = async () => {
    const data = dataToSend()
    const res = await UpdateEventAPI(event._id, data)
    if (res) {
      router.push('/events')
    }
  }

  // ERROR 
  const showErrorMsg = () => {
    setShowError(true)
    setTimeout(() => { setShowError(false) }, 4000);
  }

  const hideErrorMsg = () => {
    setShowError(false)
  }

  // SUBMIT
  function submitForm(e) {
    e.preventDefault();
    if ( validationTitle() && validationDate() && validationEnd() ) {
      if (editStatus) {
        UpdateEventService()
        setEditStatus(false)
      } else {
        CreateEventService()
      }
    } else {
      setErrorMsg('Warning! Some fields are incorrect or empty')
      showErrorMsg()
    }
  }

  return (
    <div className="rounded-lg bg-white border border-gray-300 p-5 w-11/12 lg:w-2/5 relative xl:w-1/5 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
      {/* ------- CLOSE ICON ------- */}
      <div onClick={handleForm} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        <XMark className='h-6 w-6' /> 
      </div>
      {/* ------- TITLE FORM ------- */}
      <h1 className="text-3xl font-medium">{editStatus ? 'Update your event...' : 'New event...'}</h1>
      <p className="text-sm">{editStatus ? 'Check out the details' : 'Just need some details to start'}</p>
      {/* ------- FORM ------- */}
      <form className="space-y-3 mt-5" onSubmit={(e) => submitForm(e)}>
        {/* ------- TITLE EVENT ------- */}
        <input type="text" value={title} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Title*" onChange={handleTitle} />
        <span className={`m-0 p-0 ${!validationTitle() && title !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid title.</span>
        {/* ------- DATE ------- */}
        <div className='flex flex-col w-full'>
          <span className={`m-0 p-0 text-gray-600 text-xs`}>Date*</span>
          <input value={date} disabled={editStatus} className="w-full h-12 border border-gray-800 rounded px-3" type='date' placeholder="Date*" onChange={handleDate}/>
        </div>
        <span className={`m-0 p-0 ${!validationDate() && date !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>{editStatus ? 'Event date cannot be changed' : 'Please provide a valid date.'}</span>
        {/* ------- START AND END ------- */}
        <div className="flex gap-5">
          <div className='flex flex-col w-full'>
            <span className={`m-0 p-0 text-gray-600 text-xs`}>Start Time*</span>
            <input value={start} className="w-full h-12 border border-gray-800 rounded px-3" type='time' placeholder="Start time*" onChange={handleStart}/>
          </div>
          <div className='flex flex-col w-full'>
            <span className={`m-0 p-0 text-gray-600 text-xs`}>End Time*</span>
            <input value={end} className="w-full h-12 border border-gray-800 rounded px-3" type='time' placeholder="End time*"  onChange={handleEnd}/>
          </div>
        </div>
        {/* ------- ERROR ------- */}
        <span className={`m-0 p-0 ${!validationEnd() && end !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>End time must be after start time.</span>
        {showError &&
          <ErrorMsg message={errorMsg} hide={hideErrorMsg}/>
        }
        {/* ------- BUTTON------- */}
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'> { editStatus ? 'Update' : 'Start' }</button>
      </form>
    </div>
  )
}

// props validation
EventForm.propTypes = {
  handleForm: PropTypes.func,
}


export default EventForm