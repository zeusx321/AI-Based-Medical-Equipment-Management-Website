import React from 'react'
import { briefDev } from '../constants'
import LineGraph from './LineGraph'
import greenUpIcon from '../assets/Green-up.svg'
import downGreenDoubleIcon from '../assets/Up-green.svg'
import downRedIcon from '../assets/Down-red.svg'
/* import downRedDoubleIcon from '../assets/Down-red-double.svg' */
import { categoriesConditionData } from '../constants'

import '../index.css'

const Dashboard = ({ info, setInfo }) => {
    const per = 75;

  return (
    <div className=' flex flex-col gap-6 py-1 pb-3'> 
        
        <div className='grid grid-cols-4  max-2xl:grid-cols-2  max-md:grid-cols-1 justify-between items-center gap-5 '>
            {briefDev.map((items) => (
                <div className='flex flex-1 bg-color-gray2 rounded-[12px] gap-3 h-full justify-between items-center px-10 py-[25px]'>
                    <div className='flex flex-col gap-[1px]'>
                        <p className='text-color-white/50'>{items.title}</p>
                        <h2 className='text-[33px] font-bold'>{items.number}</h2>
                        <p className='text-color-white/50'>{items.status? "+" : '-'}{items.increaseNum}% from last week</p>
                    </div>
                    <div className={`${items.status ? 'bg-color-green/10' : 'bg-color-red/10'} h-[50px] w-[50px] flex justify-center items-center rounded-[8px]`}>
                        <img src={items.status? greenUpIcon : downRedIcon} alt="" className='w-7'/>
                    </div>
                </div>
            ))}
        </div>

        <div className='box grid grid-cols-2 max-xl:grid-cols-1 gap-5 h-full'>

            <div className='flex flex-col gap-6'>
                <div className={`bg-color-gray2 rounded-[12px] px-10 py-[25px] flex justify-center flex-col items-start gap-1 max-sm:px-8`}>
                    <h2 className='text-[30px] font-bold max-sm:text-[27px]'>Inventory</h2>
                    <h3 className='text-[50px] font-extrabold flex items-end gap-2 max-sm:text-[40px]'>356  
                        <div className='flex text-[17px] font-light gap-2 pb-2'>
                            <span className='font-semibold'>/390</span> 
                            <span>Devices</span>
                            <img src={downGreenDoubleIcon} alt="Up Icon" className='inline w-3' />
                        </div>
                    </h3>
                    <div className='w-full flex flex-col gap-3'>
                        <div className='flex justify-between text-[17px]'>
                            <p className='font-extralight max-sm:text-[16px]'>Average Condition</p>
                            <p className='font-extralight max-sm:text-[16px]'>75%</p>
                        </div>
                        <div className='w-full h-5 bg-color-white rounded-full max-sm:h-4'>
                            <div className={`h-full bg-color-green rounded-s-full`} style={{ width: `${per}%` }} ></div>
                        </div>
                    </div>

                </div>

                <div className='bg-color-gray2 rounded-[12px] px-6 pt-[25px] pb-3 flex flex-col gap-5 overflow-x-auto categories-box max-sm:px-2'>
                    <h2 className='text-[30px] font-bold pl-4'>Year View</h2>
                    <LineGraph />
                </div>
            </div>

            <div className='bg-color-gray2 rounded-[12px] px-6 py-[25px] w-full h-full lg:h-[659px]  flex flex-col gap-5 overflow-x-auto categories-box'>
                <h2 className='text-[30px] font-bold'>Categories Condition</h2>
                <div className='flex flex-col gap-4'>
                    {categoriesConditionData.map((items) => (
                        <div className='bg-color-gray3 rounded-[12px] px-6 py-5 flex flex-col gap-3'>
                            <div className=' flex justify-between items-center'>
                                <div className='flex items-center justify-start gap-2 flex-wrap'>
                                    <h3 className='text-[19px] max-sm:text-[15px] font-medium'>{items.categoryName}</h3>
                                    <button key={items.id} className='sm:hidden bg-color-white/10 rounded-full p-1 px-2 text-[14px]'
                                    onClick={() => (setInfo({
                                        open: !info.open,
                                        index: items.id
                                    }))}
                                    >
                                        info
                                    </button>
                                </div>
                                <p>{items.percentage}%</p>
                            </div>
                            <div className='w-full h-4 bg-color-white rounded-full'>
                                <div className={`h-4 bg-color-green rounded-s-full`} style={{ width: `${items.percentage}%` }} ></div>
                            </div>
                            <div className='flex gap-5 max-sm:hidden'>
                                <div className='flex gap-2 items-center'>
                                    <p>Working:</p>
                                    <div className='bg-color-green/10 py-[2px] px-[6px] rounded-full'><p className='text-color-green'>{items.working}</p></div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p>Issues:</p>
                                    <div className='bg-color-red/10 py-[2px] px-[6px] rounded-full'><p className='text-color-red'>{items.issues}</p></div>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <p>Status:</p>
                                    <div
                                    className={`
                                        ${(items.statusColor) == 1 ? 'bg-color-green/10' : (items.statusColor) == 2 ? 'bg-color-warning/10' : 'bg-color-red/10' } p-1 px-2 rounded-full
                                        `}
                                    ><p
                                    className={`
                                        ${(items.statusColor) == 1 ? 'text-color-green' : (items.statusColor) == 2 ? 'text-color-warning' : 'text-color-red' }
                                    `}
                                    >{items.status}</p></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
