import React from 'react'
import { ArrowUpAndDown, Search } from '../../../components/common/Icons'

function Requests() {
  return (
    <>
      <div className='w-full h-full relative px-8 pt-10'>
        <p className='font-bold text-[30px]'>Requests</p>
        <hr className="mb-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
        <div className='mt-4 flex justify-center'>
          <div className="bg-white shadow rounded-lg pt-6 w-[95%]">
            <div className="flex justify-end px-8">
              <div className="flex items-center relative pl-3">
                <Search className='w-6 h-6 absolute left-6' />
                <input type="text" className="p-2 font- pl-10 border border-gray-200 rounded-lg w-50 bg-gray-10 focus:border-gray-500" placeholder="Search..." />
              </div>
              <div className="flex items-center gap-2 relative pl-3">
                <span>Sort by:</span>
                <div className='px-2 py-2 border font-bold border-gray-200 cursor-pointer rounded-lg w-50 bg-gray-10 hover:bg-gray-50 flex items-center gap-2'>
                  Newest
                  <ArrowUpAndDown />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 mt-6 text-lg">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-10">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-5">
                        Request
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
                      {/* <th scope="col" className="px-6 py-5">
                          <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Jane's birthday
                      </th>
                      <td className="px-6 py-4">
                        25-05-23
                      </td>
                      <td className="px-6 py-4">
                        28-09-23
                      </td>
                      <td className="px-6 py-4">
                        250
                      </td>
                      <td className="px-6 py-4">
                        Jane Cooper
                      </td>
                      <td className="px-6 py-4">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td>
                    </tr>
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