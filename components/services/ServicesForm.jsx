import PropTypes from 'prop-types'
import { useState } from 'react'
import ErrorMsg from '../common/ErrorMsg'
import { XMark } from '../common/Icons'
import { useRouter } from 'next/router'
import { GetCategoriesAPI } from '../../services/category.services'
import { GetCitiesAPI } from '../../services/city.service'

function ServicesForm({ handleForm, services }) {
  const router = useRouter()
  // OPTIONS
  const [categoryList, setCategoryList] = useState('')
  const [cityList, setCityList] = useState('')
  // DATA
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [city, setCity] = useState('')
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
    setCategoryList(res)
  }

  const handleCategory = (e) => {
    setCategory()
  }

  const validationCategory = () => {
    
  }

  // CATEGORY
  const GetCitiesList = async () => {
    const res = await GetCitiesAPI()
    setCityList(res)
  }

  const handleCity = (e) => {
    setCity()
  }

  const validationCity = () => {
    
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

  useState(() => {
    GetCategoriesList()
    GetCitiesList()
  }, [])

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
      /* CreateService() */
    } else {
      if(imgVerification) {
        setErrorMsg('Warning! Some fields are incorrect or empty')
        showErrorMsg()
      }
    }
  }

  return (
    <div className="rounded-lg bg-white border top-10 border-gray-300 p-5 relative w-11/12 lg:w-2/5 xl:w-1/5 py-[50px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] ">
      <div onClick={handleForm} className="bg-white cursor-pointer rounded-md p-2 inline-flex absolute items-center justify-center top-4 right-4 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
        <span className="sr-only">Close menu</span>
        <XMark className='h-6 w-6' /> 
      </div>
      <h1 className="text-3xl font-medium">{editStatus ? 'Update your event...' : 'New event...'}</h1>
      <p className="text-sm">{editStatus ? 'Check out the details' : 'Just need some details to start'}</p>
      <form className="space-y-3 mt-5" onSubmit={(e) => submitForm(e)} encType="multipart/form-data">
        {avatarPreview && 
          <img src={avatarPreview} alt="Avatar Preview" className="w-[50px] h-[50px] rounded-full mx-auto" />
        ||
          <img src={`${process.env.baseURL}/uploads/services.jpg`} alt="Default Avatar" className="w-[50px] h-[50px] rounded-full mx-auto"/>
        }
        <input type="text" value={title} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Title*" onChange={handleTitle} />
        <span className={`m-0 p-0 ${!validationTitle() && title !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid title.</span>
        <input value={price} className="w-full h-12 border border-gray-800 rounded px-3" type="number" step="0.01" placeholder="Price*" onChange={handlePrice}/>
        <span className={`m-0 p-0 ${!validationPrice() && price !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Please provide a valid price</span>
        <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' />
        <span className={`m-0 p-0 ${imgVerification() && selectedFile !== '' ? 'visible' : 'hidden'} text-red-600 text-xs`}>Invalid file type. Please select a JPEG/JPG or PNG image.</span>
        {showError &&
          <ErrorMsg message={errorMsg} hide={hideErrorMsg}/>
        }
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'>Publish</button>
      </form>
    </div>
  )
}

// props validation
ServicesForm.propTypes = {
  handleForm: PropTypes.func,
}


export default ServicesForm