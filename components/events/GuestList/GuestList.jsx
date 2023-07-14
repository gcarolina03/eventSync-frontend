import PropTypes from 'prop-types'

function GuestList({ list }) {
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
}

export default GuestList