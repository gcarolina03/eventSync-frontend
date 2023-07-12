import { useState } from 'react'
import { GetCategoriesAPI } from '../../services/category.services'

function ServicesDashboard() {
  const [category, setCategory] = useState('none')
  const [categoryList, setCategoryList] = useState('')

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
  }, [])
  return (
    <div class="md:w-[80%] px-4 md:px-0 h-full py-8 mx-auto border border-red-500">
      <div class="grid grid-cols-4 sm:grid-cols-12 gap-6">
        <div class="col-span-4 sm:col-span-3">
          <div class="bg-white shadow rounded-lg pt-6">
            <div className='flex px-6 justify-between'>
              <h1 class="text-3xl font-bold">Filters</h1>
              <div class="border border-gray-200 cursor-pointer hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded">Clear all</div>
            </div>
            <div class="flex w-full flex-col gap-2 mt-6 text-lg">
                <ul>
                  {categoryList.length > 0 && 
                  categoryList.map((category) => (
                    <li class="py-5 font-semibold border-b-2 px-6" key={category._id}>{category.title}</li>
                  ))
                  }
                </ul>
            </div>
          </div>
        </div>
        <div class="col-span-4 sm:col-span-9">

        </div>
      </div>
    </div>
  )
}

export default ServicesDashboard