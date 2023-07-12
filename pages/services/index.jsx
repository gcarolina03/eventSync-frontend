import { useState } from 'react'
import { GetCategoriesAPI } from '../../services/category.services'
import { GetServicesAPI } from '../../services/services.service'
import { Camera, Couch, FaceSmile, Food, GroupPeople, Map, Production } from '../../components/common/Icons'
import Card from '../../components/services/Card'
import NoServices from '../../components/services/NoServices'

function ServicesDashboard() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [services, setServices] = useState('')
  const [categoryList, setCategoryList] = useState('')
  const icons = {
    Production: <Production />,
    Couch: <Couch />,
    Food: <Food />,
    Camera: <Camera />,
    GroupPeople: <GroupPeople />,
    FaceSmile: <FaceSmile />,
    Map: <Map />
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

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  // GET DATA
  useState(() => {
    GetCategoriesList()
    getServices()
  }, [])

  // SELECT CATEGORY
   const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  // FILTER DATA
   const filterServices = () => {
    console.log(services)
    let dataFilter = services 
    if(activeCategory !== 'all') {
      dataFilter = dataFilter.filter((service) => service.categoryId._id === activeCategory )
    }
    
    console.log(activeCategory)
    return dataFilter 
  }


  return (
    <div class="md:w-[95%] px-4 md:px-0 h-full py-8 mx-auto">
      <div class="grid grid-cols-4 sm:grid-cols-12 gap-6">
        <div class="col-span-4 sm:col-span-3">
          <div class="bg-white shadow rounded-lg pt-6">
            <div className='flex px-6 justify-between'>
              <h1 class="text-3xl font-bold">Filters</h1>
              <div onClick={() => handleCategorySelect('all')} class="border border-gray-200 cursor-pointer hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded">Clear all</div>
            </div>
            <div class="flex w-full flex-col gap-2 mt-6 text-lg">
                <ul>
                  {categoryList.length > 0 && 
                  categoryList.map((category) => (
                    <li onClick={() => handleCategorySelect(category._id)} class="py-5 font-semibold border-b-2 cursor-pointer hover:bg-gray-100 flex gap-6 items-center px-6" key={category._id}>
                      {icons[category.icon]} {category.title}</li>
                  ))
                  }
                </ul>
            </div>
          </div>
        </div>
        <div class="col-span-4 sm:col-span-9">
          <p className='font-bold text-[30px]'>Our Services</p>
          <p>Discover a wide range of top-notch services offered by registered professionals on our platform. From decor to photography, our experts deliver exceptional results. Each service provider is carefully vetted, ensuring excellence every step of the way. Explore our ever-growing selection and find the perfect match for your next event!</p>
          <hr className="my-5 h-0.5 border-t-0 bg-gray-500 opacity-20" />
          <div className='mt-4 flex flex-wrap gap-8'>
            {filterServices().length === 0 ? (
              <NoServices />
            ) : (
              filterServices().map((service) => (
                <Card key={service._id} data={service} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesDashboard