import { useEffect, useState } from 'react'
import { GetCategoriesAPI } from '../../src/services/category.services'
import { GetServicesAPI } from '../../src/services/services.service'
import { Camera, Couch, FaceSmile, Food, GroupPeople, Map, Production } from '../../src/components/common/Icons'
import Card from '../../src/components/services/Card'
import NoServices from '../../src/components/services/NoServices'
import { GetProfileAPI } from '../../src/services/user.service'
import SelectEventForm from '../../src/components/requests/SelectEventForm'
import Blur from '../../src/components/common/Blur'
import { useRouter } from 'next/router'

function ServicesDashboard() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('all')
  const [services, setServices] = useState('')
  const [categoryList, setCategoryList] = useState('')
  const [reload, setReload] = useState(false)
  const [userLog, setUserLog] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [serviceTo, setServiceTo] = useState('')
  const icons = {
    Production: <Production />,
    Couch: <Couch />,
    Food: <Food />,
    Camera: <Camera />,
    GroupPeople: <GroupPeople />,
    FaceSmile: <FaceSmile />,
    Map: <Map />
  }

  const handleForm = () => {
    setShowForm(!showForm)
  }

  const handleReload = () => {
    setReload(true)
  }

  const handleServiceTo = (data) => {
    if(userLog) {
      setServiceTo(data)
      setShowForm(!showForm)
    } else {
      router.push('/login')
    }
  }

  // CHECK IF USER LOG
  const GetProfile = async () => {
    const res = await GetProfileAPI()
    if (res) {
      setUserLog(res)
    }
  }

  // SERVICES
  const getServices = async () => {
    const res = await GetServicesAPI()
    setServices(res.data)
  }

  // CATEGORY
  const GetCategoriesList = async () => {
    const res = await GetCategoriesAPI()
    setCategoryList(res.data)
  }

  // GET DATA
  useEffect(() => {
    GetCategoriesList()
    GetProfile()
  }, [])

  useEffect(() => {
    getServices()
    setReload(false)
  }, [reload])

  // SELECT CATEGORY
   const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  // FILTER DATA
   const filterServices = () => {
    let dataFilter = services 
    if(activeCategory !== 'all') {
      dataFilter = dataFilter.filter((service) => service.categoryId._id === activeCategory )
    }
    
    return dataFilter 
  }


  return (
    <div className="md:w-[95%] px-4 md:px-0 h-full py-8 mx-auto">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6">
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-white shadow rounded-lg pt-6">
            <div className='flex px-6 justify-between'>
              <h1 className="text-3xl font-bold">Filters</h1>
              <div onClick={() => handleCategorySelect('all')} className="border border-gray-200 cursor-pointer hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded">Clear all</div>
            </div>
            <div className="flex w-full flex-col gap-2 mt-6 text-lg">
              <ul>
                {categoryList.length > 0 && 
                categoryList.map((category) => (
                  <li onClick={() => handleCategorySelect(category._id)} className={`py-5 font-semibold border-b-2 hover:bg-gray-100 flex gap-6 items-center px-6 ${activeCategory == category._id ? 'bg-gray-100' : 'cursor-pointer'}`} key={category._id}>
                    {icons[category.icon]} {category.title}</li>
                ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-4 sm:col-span-9">
          <p className='font-bold text-[30px]'>Our Services ({filterServices().length})</p>
          <p>Discover a wide range of top-notch services offered by registered professionals on our platform. From decor to photography, our experts deliver exceptional results. Each service provider is carefully vetted, ensuring excellence every step of the way. Explore our ever-growing selection and find the perfect match for your next event!</p>
          <hr className="my-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
          <div className='mt-4 flex flex-wrap gap-8'>
            {filterServices().length === 0 ? (
              <NoServices />
            ) : (
              filterServices().map((service) => (
                <Card key={service._id} data={service} update={handleReload} user={userLog} requestTo={handleServiceTo}/>
              ))
            )}
          </div>
        </div>
      </div>
      {showForm &&
          <Blur form={ <SelectEventForm handleForm={handleForm} service={serviceTo}/>} />
        }
    </div>
  )
}

export default ServicesDashboard