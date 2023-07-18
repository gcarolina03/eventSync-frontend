import PropTypes from 'prop-types'
import { TrashCan, XMark } from '../common/Icons'

function DeleteAlert({ handleDelete, deleteEvent }) {
  return (
    <>
      <div className="rounded-lg flex flex-col bg-white border transform translate-x-[-50%] left-[50%] top-10 sm:top-[40%] absolute border-gray-300 p-5 w-11/12 lg:w-2/6 xl:w-1/6 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
        <div onClick={handleDelete} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Close menu</span>
          <XMark className='h-6 w-6' />
        </div>
        <TrashCan className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" />
        <p className="text-center font-bold text-gray-700">Are you sure you want to delete this event?</p>
        <span className="mb-5 self-center italic text-[10px] px-2 rounded relative" role="alert">
          This action cannot be undone.
        </span>
        <div className="flex justify-center items-center space-x-4">
            <div onClick={handleDelete} className="cursor-pointer py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                No, cancel
            </div>
            <div onClick={() => { deleteEvent() }} className="cursor-pointer py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                Yes, I'm sure
            </div>
        </div>
      </div>
    </>
  )
}

// props validation
DeleteAlert.propTypes = {
  handleDelete: PropTypes.func,
  deleteEvent: PropTypes.func,
}

export default DeleteAlert