import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className='pt-[10%] flex justify-center'>
        <form className='bg-black w-1/2 grid grid-cols-12'>
            <input type="text" className="p-4 m-4 col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}></input>
            <button className='py-2 col-span-3 px-4 bg-red-700 text-white m-4 rounded-lg'>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar