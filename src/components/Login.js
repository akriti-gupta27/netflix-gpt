import { useRef, useState } from "react"
import Header from "./Header"
import {checkValidData} from "../utils/validate.js"

const Login = () => {

  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
  }
  
  return (
    <div>
      <Header/>
      <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_small.jpg" alt="logo"/>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="text-white w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input 
          type="text" 
          placeholder="Full Name" 
          className="p-4 my-4 w-full bg-gray-300">
          </input>)}
        <input
          ref={email} 
          type="text" 
          placeholder="Email address" 
          className="p-4 my-4 w-full bg-gray-300 text-white">
        </input>
        <input
          ref={password} 
          type="text" 
          placeholder="Password" 
          className="p-4 my-4 w-full bg-gray-300">
          </input>
          <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        <button className="p-4 my-6 bg-red-600 w-full rounded-lg"
        onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}</p>
      </form>
    </div>
  )
}
 
export default Login