import PropTypes from 'prop-types'
import { useState } from 'react'
import ErrorMsg from '../common/ErrorMsg'
import { ArrowDown, XMark } from '../common/Icons'
import { useRouter } from 'next/router'
import { GetCategoriesAPI } from '../../services/category.services'
import { GetCitiesAPI } from '../../services/city.service'
import { CreateServiceAPI, UpdateServiceAPI } from '../../services/myservices.service'

function ServicesForm({ handleForm, service }) {
  const router = useRouter()
  // OPTIONS
  const [categoryList, setCategoryList] = useState('')
  const [cityList, setCityList] = useState('')
  // DATA
  const [avatar, setAvatar] = useState(`uploads/services.jpg`)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('none')
  const [max, setMax] = useState(0)
  const [min, setMin] = useState(0)
  const [city, setCity] = useState('none')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [price, setPrice] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)
  const [editStatus, setEditStatus] = useState(false)

  // TITLE
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const validationTitle = () => {
    return (title.length > 4)
  }

  // CATEGORY
  const GetCategoriesList = async () => {
    const res = await GetCategoriesAPI()
    setCategoryList(res.data)
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  const validationCategory = () => {
    return (category !== 'none')
  }

  // MAX
  const handleMax = (e) => {
    setMax(parseInt(e.target.value))
  }

  const validationMax = () => {
    return (min < max)
  }

  // MIN
  const handleMin = (e) => {
    setMin(parseInt(e.target.value))
  }

  const validationMin = () => {
    return (min > 0)
  }

  // START
  const handleStart = (e) => {
    setStart(e.target.value)
  }

  // END
  const handleEnd = (e) => {
    setEnd(e.target.value)
  }

  const validationEnd = () => {
    return (start < end)
  }

  // CITY
  const GetCitiesList = async () => {
    const res = await GetCitiesAPI()
    setCityList(res.data)
  }

  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const validationCity = () => {
    return (city !== 'none')
  }

  // AVATAR
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)

    // Generate a temporary URL for the selected file
    const previewURL = URL.createObjectURL(file)
    setAvatarPreview(previewURL)
  }

  const imgVerification = (e) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpeg'] // Specify the allowed file types
    if(selectedFile && selectedFile !== null) return (!allowedTypes.includes(selectedFile.type))
  }

  // PRICE
  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const validationPrice = () => {
    return (price > 0)
  }

  // GET DATA
  useState(() => {
    GetCategoriesList()
    GetCitiesList()
  }, [])

  // CREATE SERVICE
  const CreateService = async () => {
    const res = await CreateServiceAPI(title, category, city, max, min, selectedFile, price, start, end)
    if (res) {
      window.location.href = window.location.href 
    }
  }

  // UPDATE DATE IF EVENT IN PARAMS
  const updateData = () => {
    if (service) {
      setAvatar(service.img_url)
      setTitle(service.title)
      setCategory(service.categoryId._id)
      setMin(service.min_capacity)
      setMax(service.max_capacity)
      setStart(service.start_time)
      setEnd(service.end_time)
      setCity(service.cityId._id)
      setPrice(service.price)
      setEditStatus(true)
    }
  }

  useState(() => {
    updateData()
  }, [service])

  // HANDLE DATA TO UPDATE
  const dataToSend = () => {
    let data = {}
    if(title !== service.title && title !== '' && validationTitle()) data.title = title
    if(category !== service.categoryId._id && category !== '' && validationCategory()) data.categoryId = category
    if(min !== service.min_capacity && min !== '' && validationMin()) data.min_capacity = min
    if(max !== service.max_capacity && max !== '' && validationMax()) data.max_capacity = max
   /*  if(start !== service.start_time && start !== '') data.start_time = start
    if(end !== service.end_time && end !== '' && validationEnd()) data.end_time = end
    if(city !== service.cityId._id && city !== '' && validationEnd()) data.cityId = city
    if(price !== service.price && price !== '' && validationPrice()) data.price = price
 */
    return data
  }
  
  // EDIT EVENT SERVICE
  const UpdateService = async () => {
    const data = dataToSend()
    const res = await UpdateServiceAPI(service._id, data)
    if (res) {
      setEditStatus(false)
      router.push('/profile/services')
    }
  }

   // ERROR 
  const showErrorMsg = () => {
    setShowError(true)
    setTimeout(() => { setShowError(false) }, 4000);
  }

  const hideErrorMsg = () => {
    setShowError(false)
  }
  
  // SUBMIT
  function submitForm(e) {
    e.preventDefault();
    if ( validationTitle() && validationCategory() && validationCity() && validationPrice() && !imgVerification()) {
      /* CATEGORY LOCATION CHECK MAX AND MIN */
      if (category === '64ac73ab173c1b223d20f928') {
        if (validationMin() && validationMax()) {
          if (editStatus) {
            UpdateService()
          } else {
            CreateService()
          }
        } else {
          setErrorMsg('Warning! Some fields are incorrect or empty')
          showErrorMsg()
        }
      } else {
        if (editStatus) {
          UpdateService()
          setEditStatus(false)
        } else {
          CreateService()
        }
      }
    } else {
      if(imgVerification) {
        setErrorMsg('Warning! Some fields are incorrect or empty')
        showErrorMsg()
      }
    }
  }

  return (
    <div className="rounded-lg bg-white border border-gray-300 p-5 relative w-11/12 lg:w-2/5 xl:w-1/5 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
      {/* ------- CLOSE ICON ------- */}
      <div onClick={handleForm} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        <XMark className='h-6 w-6' /> 
      </div>
      {/* ------- TITLE FORM ------- */}
      <h1 className="text-3xl font-medium">{editStatus ? 'Update your service...' : 'New service...'}</h1>
      <p className="text-sm">{editStatus ? 'Check out the details' : 'Just need some details to start'}</p>
      {/* ------- FORM ------- */}
      <form className="space-y-3 mt-5" onSubmit={(e) => submitForm(e)} encType="multipart/form-data">
        {/* ------- AVATAR ------- */}
        {avatarPreview && 
          <img src={avatarPreview} alt="Avatar Preview" className="w-[50px] h-[50px] rounded-full mx-auto" />
        ||
          <img src='https://res.cloudinary.com/dhveca8ba/image/upload/v1689175401/dxbjiapytdozcg3qdoyw.jpg' alt="Default Avatar" className="w-[50px] h-[50px] rounded-full mx-auto"/>
        }
        {/* ------- TITLE SERVICE ------- */}
        <input type="text" value={title} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Title*" onChange={handleTitle} />
        <span className={`m-0 p-0 ${!validationTitle() && title !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid title.</span>
        {/* ------- CATEGORY ------- */}
        <div className="relative">
          <select onChange={handleCategory} value={category} className={`block appearance-none bg-white focus:outline-none w-full h-12 border border-gray-800 rounded px-3 ${category == 'none' && 'text-gray-400'}`}>
            <option value="none">Select a Category</option>
            {categoryList.length > 0 && 
              categoryList.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              )) 
            }
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ArrowDown className='fill-current h-4 w-4' />
          </div>
        </div>
        {/* ------- IF CATEGORY LOCATION ------- */}
        {category === '64ac73ab173c1b223d20f928' &&
          <>
          {/* ------- MIN AND MAX ------- */}
            <div className="w-full flex items-center gap-4">
              <input type="number" value={min} min='1' className="w-1/2 h-12 border border-gray-800 rounded px-3" onChange={handleMin} placeholder="Min Capacity*" />
              <input type="number" value={max} min='1' className="w-1/2 h-12 border border-gray-800 rounded px-3" onChange={handleMax} placeholder="Max Capacity*" />
            </div>
            <span className={`m-0 p-0 ${!validationMax() && max !== 0 && min !== 0 ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid capacity.</span>
          {/* ------- START AND END ------- */}
            <div className="flex gap-5">
              <div className='flex flex-col w-full'>
                <span className={`m-0 p-0 text-gray-600 text-xs`}>Start Time*</span>
                <input value={start} className="w-full h-12 border border-gray-800 rounded px-3" type='time' placeholder="Start time*" onChange={handleStart}/>
              </div>
              <div className='flex flex-col w-full'>
                <span className={`m-0 p-0 text-gray-600 text-xs`}>End Time*</span>
                <input value={end} className="w-full h-12 border border-gray-800 rounded px-3" type='time' placeholder="End time*"  onChange={handleEnd}/>
              </div>
            </div>
            <span className={`m-0 p-0 ${!validationEnd() && end !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>End time must be after start time.</span>
          </>
        }
        {/* ------- CITY ------- */}
        <div className="relative">
          <select onChange={handleCity} value={city} className={`block appearance-none bg-white focus:outline-none w-full h-12 border border-gray-800 rounded px-3 ${city == 'none' && 'text-gray-400'}`}>
            <option value="none">Select a city (postal code)</option>
            {cityList.length > 0 && 
              cityList.map((city) => (
                <option key={city._id} value={city._id}>{city.postal_code}</option>
              )) 
            }
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ArrowDown className='fill-current h-4 w-4' />
          </div>
        </div>
        {/* ------- PRICE ------- */}
        <input value={price} min='1' className="w-full h-12 border border-gray-800 rounded px-3" type="number" step="0.01" placeholder="Price*" onChange={handlePrice}/>
        <span className={`m-0 p-0 ${!validationPrice() && price !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid price</span>
        {/* ------- FILE ------- */}
        <input name="avatar" accept="image/*" onChange={handleFileChange} className="block cursor-pointer file:cursor-pointer w-full mb-5 text-sm text-slate-500 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700" type="file" />
        <span className={`m-0 p-0 ${imgVerification() && selectedFile !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Invalid file type. Please select a JPEG/JPG or PNG image.</span>
        {/* ------- ERROR ------- */}
        {showError &&
          <ErrorMsg message={errorMsg} hide={hideErrorMsg}/>
        }
        {/* ------- BUTTON------- */}
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'>{ editStatus ? 'Update' : 'Publish'}</button>
      </form>
    </div>
  )
}

// props validation
ServicesForm.propTypes = {
  handleForm: PropTypes.func,
}


export default ServicesForm