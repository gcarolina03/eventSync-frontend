import PropTypes from 'prop-types'
import { TrashCan } from '../../common/Icons'

function GuestList({ list, editModeGuest, removeGuest}) {
  return (
    <>
      {/* GUEST LIST AREA */}
      <table className="w-full mt-4 text-left text-gray-500">
        <thead className="text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-10">
              Name
            </th>
            <th scope="col" className="px-6 py-10">
              Phone
            </th>
            <th scope="col" className="px-6 py-5">
              Number of people
            </th>
            {editModeGuest && 
              <th scope="col" className="py-5 w-10 pr-2">
                Action
              </th>
            }
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((guest, idx) => (
              <tr key={list.idx} className="bg-white border-b hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                  {guest.name}
                </th>
                <td className="px-4 py-4">
                  {guest.phone}
                </td>
                <td className="px-4 py-4">
                  {guest.number}
                </td>
                {editModeGuest && 
                  <td scope="col" className="w-10">
                    <TrashCan onClick={() => removeGuest(guest._id)} className="cursor-pointer gap-2 h-8 py-2 text-sm rounded-lg font-bold bg-red-300 hover:bg-red-400 text-red-700 px-4" />   
                  </td>
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

// props validation
GuestList.propTypes = {
  list: PropTypes.object,
  editModeGuest: PropTypes.bool,
  removeGuest: PropTypes.func
}

export default GuestList