import { useState } from 'react';
import { notificationsData } from '../../constants'
import React from 'react'
import { motion } from 'framer-motion'

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
    
  return (
    <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute top-[65px] right-0 w-[310px] sm:w-[400px] md:w-[450px] bg-color-gray2 border border-color-white/10 rounded-2xl shadow-2xl overflow-hidden  flex flex-col max-h-[500px]"
    >
      <div className='border-b border-color-white/10 p-4 flex justify-between items-center bg-color-gray3/30'>
        <h2 className='text-[17px] font-semibold text-color-white'>Notifications</h2>
        <button className='text-[14px] text-color-purple hover:text-color-purple/80 transition-colors font-medium'
        onClick={() => {
            const updated = dataNotification.map(item => ({
                ...item,
                isRead: false
            }));

            setDataNotification(updated);
            localStorage.setItem("notification", JSON.stringify(updated));
                
        }}
        >Mark all as read</button>
      </div>
      
      <div className='overflow-y-auto notification-div p-2 flex flex-col gap-1'>
        {sortedNotifications.length > 0 ? (
            sortedNotifications.map((items) => (
                <div 
                    key={items.id} 
                    className={`flex py-4 px-4 gap-4 hover:bg-color-white/5 rounded-xl transition-colors cursor-pointer group relative`}
                    onClick={() => {
                        const updated = dataNotification.map(item =>
                            item.id === items.id
                            ? { ...item, isRead: false }
                            : item
                        );

                        setDataNotification(updated);
                        localStorage.setItem("notification", JSON.stringify(updated));
                        // setNotification(false) // Optionally close menu
                    }}
                >
                    <div className='pt-1.5'>
                        <div className={`w-2.5 h-2.5 ${ items.isRead ? 'bg-color-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-transparent' } rounded-full transition-all`}></div>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <h3 className={`text-[15px] leading-tight ${ items.isRead ? 'text-color-white font-semibold' : 'text-color-white/60 font-normal' } transition-colors group-hover:text-color-white`}>
                            {items.title}
                        </h3>
                        <p className='font-normal text-color-white/50 text-[13.5px] leading-relaxed'>
                            {items.description}
                        </p>
                        <p className='font-medium text-color-white/30 text-[12px] mt-1 italic'>
                            {items.time}
                        </p>
                    </div>
                </div>
            ))
        ) : (
            <div className="py-10 text-center text-color-white/40 text-[14px]">
                No notifications yet
            </div>
        )}
      </div>
    </motion.div>
  )
}

export default Notification
