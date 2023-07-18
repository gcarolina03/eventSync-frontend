import Link from "next/link"
import { ArrowRight } from "../common/Icons"

function NoEvents() {
  return (
    <div className='flex flex-col text-center items-center h-full justify-center text-xl w-full gap-2'>
      <p className='font-bold'>Sorry, you don't have any event yet...</p>
      <p>Create a event first</p>
      <Link href='/events' className="items-center flex px-3 py-2 text-sm font-bold text-center text-white bg-light rounded-lg hover:bg-dark focus:ring-4 focus:outline-none focus:ring-dark">
        Go to events
        <ArrowRight className='w-3.5 h-3.5 ml-2' />
      </Link>
    </div>
  )
}

export default NoEvents