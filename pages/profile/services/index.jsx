import { useEffect, useState } from "react"
import { CirclePlus } from "../../../components/common/Icons"
import AddItem from "../../../components/common/AddItem"
import { GetServicesAPI } from "../../../services/myservices.service"
import Blur from "../../../components/common/Blur"
import ServicesForm from "../../../components/services/ServicesForm"
import Card from "../../../components/services/Card"

function MyServices() {
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [serviceTo, setServiceTo] = useState('')
  const [editMode, setEditMode] = useState(false)

  const getServices = async () => {
    const res = await GetServicesAPI()
    setServices(res.data)
  }

  const handleForm = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    getServices()
  }, [])

  const handleServiceTo = (data) => {
    setServiceTo(data)
    setShowForm(!showForm)
  }

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  return (
    <>
      <div className='w-full h-full relative px-8 pt-10'>
        <div className="flex gap-8 items-center justify-between ">
          <p className='font-bold text-[30px]'>Your services</p>
          <div className="flex gap-2">
            <div onClick={handleEdit} className={`cursor-pointer flex items-center px-6 h-9 text-white font-bold text-center ${editMode ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-600'}  rounded-lg`}>
              {editMode ? 'Done' : 'Edit'}
            </div>

            <div className="cursor-pointer flex items-center px-6 h-9 text-white font-bold text-center bg-[#1CA987] rounded-lg hover:bg-[#23826B]">
              Requests
            </div>

          </div>
        </div>
        <hr className="m4-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
        <div className='mt-4 flex flex-wrap gap-8'>
          <AddItem 
            onClick={handleForm} 
            text='Publish a new service.' 
            icon={ <CirclePlus className='fill-gray-500 mb-4' height='120' /> }
          />
          {services.length > 0 &&
            services.map((service) => (
              <Card key={service._id} data={service} editMode={editMode} edit={handleServiceTo} />
            ))
          }
        </div>
        {showForm &&
          <Blur form={ <ServicesForm handleForm={handleForm} service={serviceTo}/>} />
        }
      </div>
    </>
  )
}

export default MyServices