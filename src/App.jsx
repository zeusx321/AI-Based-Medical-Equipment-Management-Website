import {useState} from 'react'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import PopUp from './components/PopUp'
import './index.css'

const App = () => {
  const [ menu, setMenu ] = useState(true);
  const [info, setInfo] = useState({
    open: false,
    index: null
  });
  const [ notification, setNotification ] = useState(false);
  
  return (
    <div>
      <div className={`w-full fixed top-0 bottom-0 right-0 left-0 lg:hidden ${info.open ? 'bg-black/50' : 'hidden'} `} onClick={() => {setInfo(prev => ({
        ...prev,
        open: false,
      }))}}>
        <div className='h-full w-full flex items-center justify-center'>
          <PopUp index={info.index} info={info} setInfo={setInfo} />
        </div>
      </div>
      <div className='flex h-screen'>
        <SideBar menu={menu} setMenu={setMenu} />
        <div className={`w-full fixed top-0 bottom-0 right-0 left-0  lg:hidden ${!menu ? 'bg-black/50' : 'hidden'} `} onClick={() => {setMenu(!menu)}}></div>
        
        <div className={`relative w-full h-[100vh] px-[20px] ${ menu ? 'lg:pl-[330px]' : 'p-0'}`}>
          <div className=''>
            <Header menu={menu} setMenu={setMenu} notification={notification} setNotification={setNotification} />
          </div>
          <Dashboard info={info} setInfo={setInfo} />
        </div>
      </div>
    </div>
  )
}

export default App
