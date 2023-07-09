import { useState } from 'react'
import ErrorMsg from '../../components/common/ErrorMsg'
import { SignUpAPI } from '../../services/auth.service'
import { useRouter } from 'next/router'

function Signup () {
  const router = useRouter()
  // DATA
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPassVisible, setIPassVisible] = useState(false);
  const [isPassRepVisible, setIPasRepVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)


  // FIRST NAME
  function handleFirstName(e) {
    setFirstName(e.target.value);
  }
  
  function firstNameVerification() {
    return (firstName.length < 3)
  }

   // LAST NAME
  function handleLastName(e) {
    setLastName(e.target.value);
  }

  // PASSWORD
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function passwordVerification() {
    return !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password))
  }

  function handleClickPass() {
    setIPassVisible(!isPassVisible);
  }

  // REPEAT PASSWORD
   function handleRepeatPassword(e) {
    setRepeatPassword(e.target.value);
  }

  function repeatPasswordVerification() {
    return repeatPassword !== password;
  }

  function handleClickPassRep() {
    setIPasRepVisible(!isPassRepVisible);
  }

  // ------ EMAIL
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function emailVerification() {
    var reg = /^([A-Za-z0-9-.])+@([A-Za-z0-9-.])+.([A-Za-z]{2,4})$/;
    return !(reg.test(email));
  }

  // SIGN UP SERVICE
  const SignUpService = async () => {
    const res = await SignUpAPI(firstName, lastName, email, password)
    if (res === 'error') {
      setErrorMsg('Error! Email already exists')
      showErrorMsg()
    } else if (!localStorage.getItem('token')) {
      setErrorMsg('Warning! Some fields are incorrect or empty')
      showErrorMsg()
    } else {
      router.push('/') // 
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
    if (
      !firstNameVerification() &&
      !passwordVerification() &&
      !emailVerification() &&
      !repeatPasswordVerification()
    ) {
      SignUpService()
    } else {
      setErrorMsg('Warning! Some fields are incorrect or empty')
      showErrorMsg()
    }
  }

  return (
    <div className="rounded-lg bg-white/30 border border-gray-300 bg-opacity-50 p-5 w-11/12 lg:w-2/5 xl:w-1/5 pt-[80px] px-10 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  max-sm:px-8">
      <h1 className="text-3xl font-medium">Signup</h1>
      <p className="text-sm">Just some details to get you in.!</p>
      <form className="space-y-5 mt-5" onSubmit={(e) => { submitForm(e) }}>
        <div className="w-full flex items-center gap-4">
          <input type="text" className="w-1/2 h-12 border border-gray-800 rounded px-3" onChange={handleFirstName} placeholder="First Name*" />
          <input type="text" className="w-1/2 h-12 border border-gray-800 rounded px-3" onChange={handleLastName} placeholder="Last Name" />
        </div>
        <input type="text" className="w-full h-12 border border-gray-800 rounded px-3" onChange={handleEmail} placeholder="Email*" />
        <div className="relative">
          <input type={isPassVisible ? 'text' : 'password'} onChange={handlePassword} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Password*" />
          <div className="absolute inset-y-0 right-0 mr-4 pl-3 cursor-pointer flex items-center" onClick={() => handleClickPass()}>
            <i className={`fas ${isPassVisible ? 'fa-eye' : 'fa-eye-slash'} text-gray-400`}></i>
          </div>
        </div>
        <div className="relative">
          <input type={isPassRepVisible ? 'text' : 'password'} onChange={handleRepeatPassword} className="w-full h-12 border border-gray-800 rounded px-3" placeholder="Confirm Password*" />
          <div className="absolute inset-y-0 right-0 mr-4 pl-3 cursor-pointer flex items-center" onClick={() => handleClickPassRep()}>
            <i className={`fas ${isPassRepVisible ? 'fa-eye' : 'fa-eye-slash'} text-gray-400`}></i>
          </div>
        </div>
        {showError &&
          <ErrorMsg message={errorMsg} hide={hideErrorMsg}/>
        }
        <button className="text-center w-full bg-secondary bg-opacity-70 rounded-lg py-3 font-medium" type='submit'>Signup</button>
      </form>

      <div className='flex flex-col items-center text-sm mt-[50px] gap-2'>
        <p className=''>Already Registered? <a href='/login' className='underline'>Login</a></p>
        <div className='flex gap-2 md:gap-4 '>
          <a href="#">Terms & Conditions</a>
          <a href="#">Support</a>
          <a href="#">Customer Care</a>
        </div>
      </div>
    </div>
  )
}

export default Signup