import React, { useState } from 'react'
import { UpdateGuestListAPI } from '../../../services/event.service'

function FormGuest({ event }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [number, setNumber] = useState(0)

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handlePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleNumber = (e) => {
    setNumber(e.target.value)
  }

  const addToList = async () => {
    const res = await UpdateGuestListAPI(event, name, phone, number)
  }

  const submitGuest = (e) => {
    e.preventDefault()
    if(name !== '') {
      addToList()
    }
  }

  return (
    <form className='flex gap-4' onSubmit={submitGuest}>   
      <input onChange={handleName} className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50" placeholder="Name / Family" />
      <input onChange={handlePhone} className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50" placeholder="Phone" />
      <input onChange={handleNumber} min='1' type='number' className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 focus:outline-none rounded-lg bg-gray-50" placeholder="Number of people" />
      <button type="submit" className="text-white bg-primary hover:bg-dark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">Add</button>
    </form>
  )
}

export default FormGuest