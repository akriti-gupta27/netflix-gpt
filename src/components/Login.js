import { useRef, useState } from "react"
import Header from "./Header"
import {checkValidData} from "../utils/validate.js"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";


const Login = () => {

  const[isSignInForm, setIsSignInForm] = useState(true);
  const[errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {
    //validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if(message) return; // error message is present
      
    //sign in/sign up logic
    if(!isSignInForm){
        //sign up logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/177637451?v=4"
              }).then(() => {
                // Profile updated!
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL}))
                navigate("/browse");
              }).catch((error) => {
                // An error occurred
                setErrorMessage(error.message);
              });             
            })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode+"-"+errorMessage);
          });

    }else{
        //sign in logic
              signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });
    }
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
          ref={name}
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
          type="password" 
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