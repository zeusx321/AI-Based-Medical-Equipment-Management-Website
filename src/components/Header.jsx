import React from 'react'
import {useState} from 'react'
import Notification from './Notification'
import whiteSearchIcon from '../assets/White-Search.svg'
import ringIcon from '../assets/Ring.svg'
import profileIcon from '../assets/Profile-Picture.jpg'
import closeIcon from '../assets/Close.svg'
import menuIcon from '../assets/Menu.svg'
import '../index.css'

const Header = ({ menu, setMenu, notification, setNotification }) => {
    const [search, setSearch] = useState(false);
    

    const displayCenter = 'flex justify-center items-center' 
    const bgHover = 'hover:bg-color-white/10 transition-all'
  return (
    <header  className={` top-0 right-0 left-0 px-5 inline ${displayCenter} justify-between h-[80px] w-full mb-3 `}>

        {/* ==== Menu & Dashboard word div ==== */}
        <div className={`${displayCenter}  max-w-[250px] ${search? 'hidden' : 'block'}`}>
            <div className={` h-[80px] ${displayCenter} ${menu?'lg:hidden ' : 'flex'}`}>
                <button className='bg-color-gray2 w-[42px] h-[42px] p-[9px] rounded-full mr-3 hover:bg-color-gray3 transition-all '
                onClick={() => { setMenu(!menu)}}
                >
                <img src={menuIcon} alt="Menu Icon" className='w-[60px]'/>
                </button>
            </div>
            <a href="#" className={`${displayCenter} bg-color-gray2 text-[18px] w-[125px] h-[50px] font-semibold rounded-full ${bgHover} max-sm:hidden
            `}>
                <h2>Dashboard</h2>
            </a>
        </div>

        {/* ==== Search Bar div ==== */}
        <div className={`flex-1 ${displayCenter} mx-4 max-sm:hidden `}>
            <div className={`w-full max-w-[430px] bg-color-gray2 ${displayCenter} h-[55px] px-4 py-[10px] rounded-full`}>
                <div className={`flex-1 ${displayCenter} rounded-full w-full h-full border-[1px] border-color-white/40 px-4`}>
                    <input type="text" className='flex-1 h-full bg-transparent placeholder:text-[14px] placeholder:text-color-white/50 text-[14px]' placeholder='Search for anything'/>
                </div>
                <button className='bg-color-purple w-[34px] p-[10px]  rounded-full ml-3 h-full hover:bg-color-purple/70 transition-all'>
                    <img src={whiteSearchIcon} alt="Search Icon" className='w-[70px]'/>
                </button>
            </div>

            
        </div>
        
        {/* ==== Account & Notification Bar div ==== */}
        <div className={`${displayCenter} gap-3 ${search? 'hidden' : 'block'}`}>
            <button className={`bg-color-gray3 w-[43px] p-[13px]  rounded-full ml-3 h-full max-sm:block hidden ${bgHover}`} onClick={()=>(setSearch(!search))}>
                    <img src={whiteSearchIcon} alt="Search Icon" className='w-[60px]'/>
            </button>
            <div className={`${displayCenter} relative bg-color-gray2 w-[115px] h-[51px] rounded-full`}>
                <button className={` bg-color-gray3 w-[34px] h-[34px] rounded-full ${displayCenter}
                ${bgHover}
                `} 
                onClick={() => setNotification(!notification)}
                >    
                    <img src={ringIcon} alt="Ring Icon" className='w-[17px]' />
                </button>
                <button>
                    <img src={profileIcon} alt="Profile Icon" className='w-[34px] ml-4 rounded-full'/>
                </button>
                <Notification notification={notification} setNotification={setNotification} />
            </div>
        </div>

        {/* ==== Hidden Search Bar div ==== */}
        <div className={`fixed top-0 right-0 left-0 m-4 flex-1 ${displayCenter} ${search? 'block' : 'hidden'} z-10`}>
            <div className={`w-full max-w-[430px] bg-color-gray2 ${displayCenter} h-[55px] px-4 py-[10px] rounded-full`}>
                <div className={`flex-1 ${displayCenter} rounded-full w-full h-full border-[1px] border-color-white/40 px-4`}>
                    <input type="text" className='flex-1 h-full bg-transparent placeholder:text-[12.5px] placeholder:text-color-white/50 text-[12.5px]' placeholder='Search for anything'/>
                </div>
                <button className={`bg-color-purple w-[34px] p-[10px]  rounded-full ml-3 h-full hover:bg-color-purple/70 transition-all`}>
                    <img src={whiteSearchIcon} alt="Search Icon" className='w-[70px]'/>
                </button>
            </div>
            <button className={`w-[40px] h-[40px] bg-color-gray2 rounded-full ${displayCenter} ml-3 ${bgHover}`}onClick={()=>(setSearch(!search))}>
                <img src={closeIcon} alt="" className='w-5' />
            </button>
        </div>
    </header>
  )
}

export default Header
