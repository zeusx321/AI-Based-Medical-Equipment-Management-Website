import { useState } from 'react';
import { notificationsData } from '../constants'
import React from 'react'

const Notification = ({ notification, setNotification }) => {
    const [dataNotification, setDataNotification] = useState(() => {
        const saved = window.localStorage.getItem("notification");
        if (!saved || saved === "undefined") {
            return notificationsData;
        }else{
            return JSON.parse(saved);
        }
    });
    const unread = dataNotification.filter(item => item.isRead);
    const read = dataNotification.filter(item => !item.isRead);

    const sortedNotifications = [...unread, ...read];
    
    localStorage.clear();
  return (
    <div className={` w-[310px] h-[400px] sm:w-[400px] md:w-[450px]
    bg-color-gray3 rounded-[12px] -bottom-9 right-0 top-[61px] p-2 px-5 overflow-x-auto notification-div 
    ${ notification ? 'absolute' : 'hidden'}
    `}>
      <div className='border-b-[1px] border-color-white/20 py-2 flex justify-between'>
        <h2 className='text-[17px] font-semibold'>Notifications</h2>
        <button className='text-[15px] text-color-purple'
        onClick={() => {
            const updated = dataNotification.map(item => ({
                ...item,
                isRead: false
            }));

            setDataNotification(updated);
            localStorage.setItem("notification", JSON.stringify(updated));
                
        }}
        >Read All As Mark</button>
      </div>
      <div className='mt-1'>
        {sortedNotifications.map((items) => (
            <div className='flex py-5 px-3 gap-3 hover:bg-color-white/5 rounded-[12px]'>
                <div className='pt-2'>
                    <div className={`w-2 h-2 ${ items.isRead ? 'bg-color-purple' : '' } rounded-full`}></div>
                </div>
                <div className='flex text-start items-start flex-col gap-1' key={items.id}
                onClick={() => {
                const updated = dataNotification.map(item =>
                    item.id === items.id
                    ? { ...item, isRead: false }
                    : item
                );

                setDataNotification(updated);

                localStorage.setItem(
                    "notification",
                    JSON.stringify(updated)
                );
                setNotification(!notification)
                }}
                >
                    <h3 className={`
                        ${ items.isRead ? 'text-color-white font-semibold' : 'text-color-white/80 font-light' } 
                        `}>{items.title}</h3>
                    <p className='font-light text-color-white/80 text-[14px]'>{items.description}</p>
                    <p className='font-light text-color-white/50 text-[13px]'>{items.time}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Notification
