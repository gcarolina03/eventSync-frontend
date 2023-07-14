import { useEffect, useState } from "react"
import { GetCategoriesAPI } from "../services/category.services"
import { ArrowRight, Camera, Couch, FaceSmile, Food, GroupPeople, Map, Production } from "../components/common/Icons"
import { GetServicesAPI } from "../services/services.service"
import Carousel from "../components/home/Carousel"
import Card from "../components/services/Card"
import Link from "next/link"
import { GetEventsAPI } from "../services/event.service"
import { GetProfileAPI } from "../services/user.service"
import NoServices from "../components/services/NoServices"

export default function Home() {
  const [categoryList, setCategoryList] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [services, setServices] = useState('')
  const [events, setEvents] = useState('')

  const icons = {
    Production: <Production />,
    Couch: <Couch />,
    Food: <Food />,
    Camera: <Camera />,
    GroupPeople: <GroupPeople />,
    FaceSmile: <FaceSmile />,
    Map: <Map />
  }

  // CATEGORY
  const GetCategoriesList = async () => {
    const res = await GetCategoriesAPI()
    setCategoryList(res.data)
  }

  // SELECT CATEGORY
   const handleCategorySelect = (category) => {
    setActiveCategory(category)
  }

  // SERVICES
  const getServices = async () => {
    const res = await GetServicesAPI()
    setServices(res.data)
  }

  // FILTER DATA
   const filterServices = () => {
    let dataFilter = services 
    if(activeCategory !== 'all') {
      dataFilter = dataFilter.filter((service) => service.categoryId._id === activeCategory )
    }
    
    return dataFilter 
  }

  // CHECK IF USER LOG
  const GetProfile = async () => {
    const res = await GetProfileAPI()
    if (res) {
      getEvents()
    }
  }

  // EVENTS
  const getEvents = async () => {
    const res = await GetEventsAPI()
    setEvents(res.data)
  }

  // GET DATA
  useEffect(() => {
    GetCategoriesList()
    getServices()
    GetProfile()
  }, [])

  return (
    <>
    <div className='w-full h-full relative px-8 pt-10'>
      <p className='font-bold text-[30px]'>Looking for a specific service?</p>
      <ul className="inline-flex bg-white shadow mt-6 rounded-lg">
        <li onClick={() => handleCategorySelect('all')} className={`py-5 font-semibold border-r-2 hover:bg-gray-100 flex gap-6 items-center px-6 ${activeCategory == 'all' ? 'bg-gray-100' : 'cursor-pointer'}`} >All</li>
        {categoryList.length > 0 && 
        categoryList.map((category) => (
          <li onClick={() => handleCategorySelect(category._id)} className={`py-5 font-semibold border-r-2 hover:bg-gray-100 flex gap-6 items-center px-6 ${activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer'}`} key={category._id}>
            {icons[category.icon]} {category.title}</li>
        ))
        }
      </ul>
      {filterServices().length === 0 && (
        <NoServices />
      ) || (
        <Carousel data={filterServices()} type='services' />
      )
      }
        <div className="w-full flex justify-center">
          <Link href='/services' className=" inline-flex items-center px-6 py-4 gap-2 text-md font-bold text-center text-white bg-dark rounded-lg hover:bg-[#201B4F] focus:ring-4 focus:outline-none focus:ring-[#201B4F">
            View all services <ArrowRight />
          </Link>
        </div>

      {events.length > 0 && 
        <>
          <p className='font-bold mt-10 text-[30px]'>Check out your future events...</p>
          <Carousel data={events} type='events' />
          <div className="w-full flex justify-center">
          <Link href='/events' className=" inline-flex items-center px-6 py-4 gap-2 mb-5 text-md font-bold text-center text-white bg-dark rounded-lg hover:bg-[#201B4F] focus:ring-4 focus:outline-none focus:ring-[#201B4F">
            View all your events <ArrowRight />
          </Link>
        </div>
        </>
      }
      

    </div>
    </>
      
  )
}