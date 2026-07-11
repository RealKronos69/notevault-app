import { useRef, useState, useEffect } from 'react'
import noteimg from './assets/notes.png'
import pin from './assets/pin.png'
import bin from './assets/remove.png'
import about from './assets/about.png'
import { RouterProvider,Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
function App() {
  const [note, setnote] = useState(()=>{
    let arr = localStorage.getItem('notes')
    return arr ? JSON.parse(arr) : []
  })
  useEffect(()=>{
    localStorage.setItem('notes',JSON.stringify(note))
  },[note])
  return (
    <section>
      <section className='bg-gray-800 h-screen grid grid-cols-[20%_80%]'>
        <div className='bg-white'>
          <div className=''>
            <ul className=''>
              <li className=''>
                <NavLink className={({ isActive }) => isActive ? "bg-blue-500 text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center" : "bg-white text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center"} to="/"><img className='w-5 h-5' src={noteimg} alt="" /><span className="hidden sm:inline">Note</span></NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "bg-blue-500 text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center" : "bg-white text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center"} to="/pinnednotes"><img className='w-5 h-5' src={pin} alt="" /><span className="hidden sm:inline">Pinned</span></NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "bg-blue-500 text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center" : "bg-white text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center"} to="/bin"><img className='w-5 h-5' src={bin} alt="" /><span className="hidden sm:inline">Bin</span></NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "bg-blue-500 text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center" : "bg-white text-center p-2 font-semibold cursor-pointer hover:bg-gray-200 font-mono text-gray-800 flex gap-5 flex-wrap items-center"} to="/about"><img className='w-5 h-5' src={about} alt="" /><span className="hidden sm:inline">About</span></NavLink>
              </li>
              
            </ul>
          </div>
        </div>
        {/* <Notes note={note} setnote={setnote} /> */}
        <Outlet context={{ note, setnote }}/>
      
      </section>
    </section>
  )
}

export default App