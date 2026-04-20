import { categoriesConditionData } from '../constants'
import closeIcon from '../assets/Close.svg'
import React from 'react'

function PopUp({ index, info, setInfo }) {
    const items = categoriesConditionData[index];

  return (
    <div className='p-16 px-8 bg-color-gray3 rounded-[15px] flex flex-col justify-center items-center fixed top-auto right-auto left-auto bottom-auto'>
       <div className='absolute top-6 right-7 '>
            <button onClick={() => setInfo(prev => ({
                ...prev,
                open: false,
            }))}>
                <img src={closeIcon} alt="Close Icon" className='w-6' />
            </button>
       </div>
       <div className='flex flex-col gap-3'>
            <h3 className='text-[25px] font-semibold'>{items?.categoryName}</h3>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2 items-center'>
                    <p>Working:</p>
                        <div className='bg-color-green/10 py-[2px] px-[6px] rounded-full'><p className='text-color-green'>{items?.working}</p></div>
                    </div>
                    <div className='flex gap-2 items-center'>
                                    <p>Issues:</p>
                                    <div className='bg-color-red/10 py-[2px] px-[6px] rounded-full'><p className='text-color-red'>{items?.issues}</p></div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p>Status:</p>
                                    <div
                                    className={`
                                        ${(items?.statusColor) == 1 ? 'bg-color-green/10' : (items?.statusColor) == 2 ? 'bg-color-warning/10' : 'bg-color-red/10' } p-1 px-2 rounded-full
                                        `}
                                    ><p
                                    className={`
                                        ${(items?.statusColor) == 1 ? 'text-color-green' : (items?.statusColor) == 2 ? 'text-color-warning' : 'text-color-red' }
                                    `}
                                    >{items?.status}</p></div>
                                </div>
            </div>
       </div>
       
    </div>
  )
}

export default PopUp
