import PropTypes from 'prop-types'

function EventForm({ handleForm }) {
  return (
    <div className="rounded-lg bg-white border transform translate-x-[-50%] left-[50%] top-10 sm:top-[50%] absolute border-gray-300 p-5 w-11/12 lg:w-2/5 xl:w-1/5 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
      <div onClick={handleForm} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h1 className="text-3xl font-medium">New event...</h1>
      <p className="text-sm">Just need some details to start</p>
      <form className="space-y-5 mt-5">
        <input type="text" className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Title*" />
        <input type="text" className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Date*" />
        <div className="flex gap-5">
          <input className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Start time*" />
          <input className="w-full h-12 border border-gray-800 rounded px-3" placeholder="End time*" />
        </div>
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'>Start</button>
      </form>
    </div>
  )
}

// props validation
EventForm.propTypes = {
  handleForm: PropTypes.func,
}


export default EventForm