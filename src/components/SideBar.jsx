/* import { useState } from 'react'; */
import { useLocation } from 'react-router-dom'
import { mainPages } from '../constants';
import { recordsPages } from '../constants';
import { settingAboutPages } from '../constants';
import textLogo from '../assets/Logo-Text.svg'
import menuIcon from '../assets/Menu.svg'
import dashboardIcon from '../assets/Dashboard.svg'
import '../index.css'

const SideBar = ({menu, setMenu}) => {
  const displayCenter = 'flex justify-center items-center' 
  const location = useLocation();
  const pagesStyle = `relative w-full px-4 py-3 rounded-[12px] flex justify-start items-center  hover:bg-color-gray3/90 transition-all duration-200 gap-4`;  

  return (
    <div className={`flex`}>
      
      <div className={`fixed z-10
      ${menu ? 'lg:translate-x-0 max-lg:-translate-x-full' : 'lg:-translate-x-full max-lg:translate-x-0'}
      top-0 left-0 h-[100vh] w-[310px]  bg-color-gray2 border-r border-color-white/5 
      pl-5 pr-3 
      flex flex-col 
      transition-all duration-300
       overflow-y-auto`}>
        
        {/* ==== Main logo & Menu bar ==== */}
        <div className={`py-6  ${displayCenter} justify-between px-3`}>
          <a href="#" className='ml-1'>
            <img src={textLogo} alt="" className='w-[130px]' />
          </a>
          <button className={`hover:bg-color-gray3 transition-all w-9 h-9 ${displayCenter} rounded-[12px]`} onClick={() => 
            {setMenu(!menu)}}>
            <img src={menuIcon} alt="" className='w-5'/>
          </button>
        </div>

        {/* ==== Main pages & Record Pages ==== */}
        <div className='pr-2 flex flex-col gap-5 flex-1'>
          <a href='#dashboard' className={` ${pagesStyle} ${'#dashboard' === location.hash ? 'bg-color-gray3/90' : 'bg-transparent'}  
          `}>
            <div className={`absolute h-7 w-[6px] bg-color-purple -left-[21px] rounded-e-[4px] 
            ${'#dashboard' === location.hash ? 'bg-color-purple' : 'bg-transparent'}  
            `}></div>
            <img src={dashboardIcon} alt="" />
            <h3>Dashboard</h3>
            <div></div>
          </a>
          <div className='flex flex-col gap-2'>
            <h2 className='px-4 text-color-white/50 text-[15px]'>Main Pages</h2>
            <div className='flex flex-col gap-2'>
              {mainPages.map((items) => (
                  <a key={items.key} href={items.url} className={`${pagesStyle}
                  ${items.url === location.hash ? 'bg-color-gray3/90' : 'bg-transparent'} `}>
                    <div className={`absolute h-7 w-[6px] bg-color-purple -left-[21px] rounded-e-[4px]  
                    ${items.url === location.hash ? 'bg-color-purple' : 'bg-transparent'}  
                    `}></div>
                    <img src={items.icon} alt={items.title} />
                    <h3>{items.title}</h3>
                  </a>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='px-4 text-color-white/50 text-[15px]'>Records</h2>
            <div className='flex flex-col gap-2'>
              {recordsPages.map((items) => (
                  <a key={items.key} href={items.url} className={`${pagesStyle}
                  ${items.url === location.hash ? 'bg-color-gray3/90' : 'bg-transparent'}
                  `} >
                    <div className={`absolute h-7 w-[6px] bg-color-purple -left-[21px] rounded-e-[4px] 
                    ${items.url === location.hash ? 'bg-color-purple' : 'bg-transparent'}  
                    `}></div>
                    <img src={items.icon} alt={items.title} />
                    <h3>{items.title}</h3>
                  </a>
              ))}
            </div>
          </div>
        </div>

        {/* ==== Settings & About Pages ==== */}
        <div className='pr-2 h-[150px] my-6 flex items-end'>
          <div className='w-full flex flex-col gap-2'>
              {settingAboutPages.map((items) => (
                  <a key={items.key} href={items.url} className={`${pagesStyle}
                  ${items.url === location.hash ? 'bg-color-gray3/90' : 'bg-transparent'}
                  `} >
                    <div className={`absolute h-7 w-[6px] bg-color-purple -left-[21px] rounded-e-[4px] 
                    ${items.url === location.hash ? 'bg-color-purple' : 'bg-transparent'}  
                    `}></div>
                    <img src={items.icon} alt={items.title} />
                    <h3>{items.title}</h3>
                  </a>
              ))}
            </div>
        </div>
      </div>

      

      
    </div>
  )
}

export default SideBar
