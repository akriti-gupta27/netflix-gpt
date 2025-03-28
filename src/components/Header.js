import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import { bgURL } from "../utils/constants";

const Header = () => {

  const navigate = useNavigate();
 
  const dispatch = useDispatch();

  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL} = user;
          //Sign in/ sign up case
          //update the store
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL:photoURL}))
          navigate("/browse");
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });
      return () => unsubscribe(); // when component unmount then this will be called
    },[])

  return (
    <div className=" w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44"
        src={bgURL} alt="logo"/>
        {user && <div className="flex p-2">
          <img className="w-12 h-12" src={user?.photoURL} alt="userIcon"/>
          <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>        
        </div>}
    </div>
  )
}

export default Header