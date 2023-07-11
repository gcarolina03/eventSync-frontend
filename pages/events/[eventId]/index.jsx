import { useEffect, useState } from "react"
import { GetEventAPI } from "../../../services/event.service"


function ResumeEvent({params}) {
  console.log(params)
  // DATA
  const [event, setEvent] = useState("")

  /* const getEvent = async () => {
    const res = await GetEventAPI(id)
    setEvent(res)
  }

  useEffect(() => {
    getEvent()
  }, []) */

  return (
      <div className='w-full h-full relative px-8 pt-10'>
      <p className='font-bold text-[30px]'>as</p>
      <hr className="m4-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
      
    </div>
  )
}

export default ResumeEvent