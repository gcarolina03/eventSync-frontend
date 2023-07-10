import { useState } from 'react'
import ErrorMsg from '../../components/common/ErrorMsg'
import { LoginAPI } from '../../services/auth.service'
import { useRouter } from 'next/router'

function Login() {
  const router = useRouter()
  // DATA
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const[isPassVisible, setIsPassVisible] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

   // ------ EMAIL
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  function emailVerification() {
    return email !== '';
  }

  // PASSWORD
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  function passwordVerification() {
    return password !== '';
  }

  const handleTogglePassword = () => {
    setIsPassVisible(!isPassVisible);
  };

  // ERROR 
   const showErrorMsg = () => {
    setShowError(true)
    setTimeout(() => { setShowError(false) }, 4000);
  }

  const hideErrorMsg = () => {
    setShowError(false)
  }

   // LOG IN SERVICE
  const logIn = async () => {
    const res = await LoginAPI(email, password)
    if (res === 'error' || !localStorage.getItem('token')) {
      setErrorMsg('Email or password incorrect')
      showErrorMsg()
    } else {
      router.push('/') 
      window.location.href = window.location.origin
    }
  }

  // SUBMIT
  function submitForm(e) {
    e.preventDefault();
    if (
      emailVerification() &&
      passwordVerification()
    ) {
      logIn()
    } else {
      setErrorMsg('Some fields are incorrect or empty')
      showErrorMsg()
    }
  }

  return (
    <div className="rounded-lg bg-white/30 border transform translate-y-[-50%] absolute top-[50%] border-gray-300 bg-opacity-50 p-5 w-11/12 lg:w-2/5 xl:w-1/5 pt-[80px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  max-sm:px-8">
      <h1 className="text-3xl font-medium">Welcome back</h1>
      <p className="text-sm">Enter your data to continue!</p>
      <form className="space-y-5 mt-5" onSubmit={(e) => { submitForm(e) }}>
        <input type="text" onChange={handleEmail} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Email*" />
        <div className="relative">
          <input type={isPassVisible ? 'text' : 'password'} onChange={handlePassword} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Password*" />
          <div className="absolute inset-y-0 right-0 mr-4 pl-3 cursor-pointer flex items-center" onClick={() => handleTogglePassword()}>
            <i className={`fas ${isPassVisible ? 'fa-eye' : 'fa-eye-slash'} text-gray-400`}></i>
          </div>
        </div>
        {showError &&
          <ErrorMsg message={errorMsg} hide={hideErrorMsg}/>
        }
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'>Login</button>
      </form>

      <div className='flex flex-col items-center text-sm mt-[50px] gap-2'>
        <p className=''>Don’t have an account? <a href='/signup' className='underline'>Signup</a></p>
        <div className='flex gap-2 md:gap-4 '>
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  )
}

export default Login