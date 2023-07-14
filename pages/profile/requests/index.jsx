import React, { useEffect, useState } from 'react'
import { ArrowUpAndDown, Check, Search, XMark } from '../../../components/common/Icons'
import { GetRequestsAPI, UpdateRequestAPI } from '../../../services/request.service'
import { formatDate } from '../../../lib/utils'

function Requests() {
  const [requests, setRequests] = useState([])
  const [sortByOldest, setSortByOldest] = useState(false)
  const [search, setSearch] = useState('')
  const [stateToShow, setStateToShow] = useState('all')

  const getRequests = async () => {
    const res = await GetRequestsAPI()
    setRequests(res.request)
  }

  const handleOrder = () => {
    setSortByOldest(!sortByOldest)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  // SELECT STATE
   const handleStateSelect = (e) => {
    setStateToShow(e.target.value);
  };

  const sortAndFilter = () => {
    const sortedRequests = sortByOldest ? 
    [...requests].sort((a, b) => parseInt(a.eventId.event_date) - parseInt(b.eventId.event_date)).sort((a, b) => parseInt(a.date_of_request) - parseInt(b.date_of_request)) : 
    [...requests].sort((a, b) => parseInt(a.eventId.event_date) - parseInt(b.eventId.event_date)).sort((a, b) => parseInt(b.date_of_request) - parseInt(a.date_of_request)) 

    let filteredRequest = sortedRequests.filter((request) => request.serviceId.title.toLowerCase().includes(search.toLowerCase()))

    if(stateToShow !== 'all') {
      filteredRequest = filteredRequest.filter((request) => request.state === stateToShow )
    }
    
    return filteredRequest
  }
  
  useEffect(() => {
    getRequests()
  }, [])

  const updateState = async (id, state) => {
    const res = await UpdateRequestAPI(id, state)
    if (res) {
      location.reload()
    }
  }

  return (
    <>
      <div className='w-full h-full relative px-8 pt-10'>
        <p className='font-bold text-[30px]'>Requests</p>
        <hr className="mb-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
        <div className='mt-4 flex justify-center'>
          <div className="bg-white shadow rounded-lg pt-6 w-[95%]">
            <div className="flex justify-between px-6">
              <div className='flex items-center gap-2'>
                <span>State:</span>
                <ul className="items-center text-sm text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                    <div className="flex items-center px-3">
                      <input  onChange={handleStateSelect}  id="all-list" type="radio" value="all" name="list-state" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" checked={stateToShow === 'all' ? true : false} />
                      <label htmlFor="all-list" className="w-full py-3 ml-2 font-semibold text-gray-900">All</label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                    <div className="flex items-center px-3">
                      <input onChange={handleStateSelect} id="confirmed-list" type="radio" value="confirmed" name="list-state" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" checked={stateToShow === 'confirmed' ? true : false} />
                      <label htmlFor="confirmed-list" className="w-full py-3 ml-2 font-semibold text-gray-900">Confirmed</label>
                    </div>
                  </li>
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                    <div className="flex items-center px-3">
                      <input onChange={handleStateSelect} id="pending-list" type="radio" value="pending" name="list-state" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" checked={stateToShow === 'pending' ? true : false} />
                      <label htmlFor="pending-list" className="w-full py-3 ml-2 font-semibold text-gray-900" >Pending</label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center px-3">
                      <input onChange={handleStateSelect} id="cancelled-list" type="radio" value="cancelled" name="list-state" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" checked={stateToShow === 'cancelled' ? true : false} />
                      <label htmlFor="cancelled-list" className="w-full py-3 ml-2 font-semibold text-gray-900">Cancelled</label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='flex'>
                <div className="flex items-center relative pl-3">
                  <Search className='w-6 h-6 absolute left-6' />
                  <input onChange={handleSearch} value={search} type="text" className="p-2 pl-10 border border-gray-200 rounded-lg w-50 bg-gray-10 focus:border-gray-500" placeholder="Search by service..." />
                </div>
                <div className="flex items-center gap-2 relative pl-3">
                  <span>Sort by:</span>
                  <div onClick={handleOrder} className='px-2 py-2 border font-bold border-gray-200 cursor-pointer rounded-lg w-50 bg-gray-10 hover:bg-gray-50 flex items-center gap-2'>
                    {sortByOldest ? 'Oldest' : 'Newest'}
                    <ArrowUpAndDown />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 mt-6 text-lg">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-gray-500">
                  <thead className="text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-10">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-10">
                        Title Event
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Request Date
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Event Date
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Nº Guest
                      </th>
                      <th scope="col" className="px-6 py-5">
                        User
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {sortAndFilter().length === 0 ? (
                        <tr className="bg-white border-b hover:bg-gray-50">
                          <th scope="row" colSpan='8' className="px-6 py-4 text-center font-bold text-gray-900 whitespace-nowrap"> No requests to show </th>
                        </tr>
                      ) : (
                        sortAndFilter().map((request) => (
                          <tr key={request._id} className="bg-white border-b hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                              {request.serviceId.title}
                            </th>
                            <td className="px-4 py-4">
                              {request.eventId.title}
                            </td>
                            <td className="px-4 py-4">
                              {formatDate(request.date_of_request)}
                            </td>
                            <td className="px-4 py-4">
                              {formatDate(request.eventId.event_date)}
                            </td>
                            <td className="px-4 py-4">
                              {request.eventId.guestList.reduce((acc, curr) => { return acc + curr.number }, 0)}
                            </td>
                            <td className="px-4 py-4">
                              {request.eventId.userId.first_name} {request.eventId.userId.last_name}
                            </td>
                            <td colSpan={request.state !== 'pending' ? '2' : '1'} className="px-4 py-4">
                              <div className='flex'>
                                <div className={`flex items-center px-3 py-2 text-sm font-bold text-center text-white rounded-lg focus:outline-none ${request.state === 'pending' ? 'bg-yellow-700' : request.state === 'confirmed' ? 'bg-green-700' : 'bg-red-800'}`}>
                                  {request.state.charAt(0).toUpperCase() + request.state.slice(1)}
                                </div>
                              </div>
                            </td>
                            {request.state === 'pending' &&
                              <td className='px-4 py-4'>
                                <div className='flex gap-2'>
                                  <Check onClick={() => updateState(request._id, 'confirmed')} className="cursor-pointer h-8 py-2 text-sm rounded-lg font-bold bg-green-300 hover:bg-green-400 text-green-700 px-4" />     
                                  <XMark onClick={() => updateState(request._id, 'cancelled')} className="cursor-pointer h-8 py-2 text-sm rounded-lg font-bold bg-red-300 hover:bg-red-400 text-red-700 px-4" />  
                                </div>
                              </td>
                            }
                          </tr>
                        ))
                      )
                      }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Requests