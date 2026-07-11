import { useState, useEffect, useRef } from "react";
import pin from '../assets/pin.png'
import remove from '../assets/remove.png'
import { useOutletContext } from 'react-router-dom';
const Notes = () => {
    const { note, setnote } = useOutletContext();
    const title = useRef()
    const text = useRef()
    const color = useRef()
    const pinnednote = note.filter((n) => n.pinned)
    const [copied, setcopied] = useState(false)
    const createnote = (TEXT, TITLE, COLOR) => {
        if (TEXT === "" && TITLE === "") {
            return;
        }

        const obj = {
            id: Date.now(),
            title: TITLE,
            text: TEXT,
            color: COLOR,
            pinned: false,
            deleted: false
        }
        setnote([obj, ...note])
        title.current.value = ""
        text.current.value = ""
        color.current.value = "#ffffff"

    }
    const timer = useRef(null)
    function copynote(notecontent) {
        navigator.clipboard.writeText(notecontent)
        setcopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setcopied(false)
        }, 1500);
    }

    const handlePin = (id) => {
        setnote((note) => {
            return note.map((NOTE) => {
                return NOTE.id === id ? { ...NOTE, pinned: !NOTE.pinned } : NOTE
            })
        })
    }

    const handleDelete = (id) => {
        setnote((note) => {
            return note.map((NOTE) => {
                return NOTE.id === id ? { ...NOTE, deleted: true, pinned: false } : NOTE
            })
        })
    }
    return (
        <div className='bg-gray-800 flex flex-col gap-10 items-center p-5 overflow-y-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-amber-50'>
            <div className=''>
                <input ref={title} className='bg-white focus:outline-0 p-2 w-full font-mono' type="text" placeholder='Title' />
                <input ref={text} className='bg-white focus:outline-0 p-2 w-full font-mono' type="text" placeholder='Create Note' />
                <div className='bg-gray-900 flex h-10 justify-between pl-2 pr-2'>
                    <input defaultValue="#ffffff" ref={color} className='w-10 h-10 rounded-2xl' type="color" />
                    <button onClick={() => { createnote(text.current.value, title.current.value, color.current.value) }} className='cursor-pointer font-extrabold text-white'>+</button>
                </div>
            </div>
            <div className='w-full'>
                {pinnednote.length > 0 && <h1 className='font-bold fon font-mono p-2 text-gray-200'>Pinned Notes</h1>}
                <div className='pinned w-full flex flex-wrap gap-5 items-start h-fit'>
                    {
                        note.map((e) => {
                            if (e.pinned === true) {

                                return (
                                    <div onClick={() => { copied() }} key={e.id} className='relative overflow-hidden max-w-60 max-h-70 wrap-break-word p-5 border-2 border-black rounded-2xl hover:shadow-md cursor-copy hover:scale-101' style={{ backgroundColor: e.color }} onClick={() => {
                                        copynote(e.text)
                                    }}>
                                        <h1 className='font-bold'>{e.title}</h1>
                                        <p className=''>{e.text}</p>
                                        <div className=" absolute bottom-0 left-0 w-full h-3 bg-amber-500"></div>
                                        <div className='absolute flex gap-2 top-1 right-1 bg-gray-200 p-1 rounded-2xl'>
                                            <button onClick={(event) => {
                                                event.stopPropagation()
                                                handleDelete(e.id)
                                            }} className='w-3 h-3'>
                                                <img className='w-full h-full' src={remove} alt="pin" />
                                            </button>
                                            <button onClick={(event) => {
                                                event.stopPropagation()
                                                handlePin(e.id)
                                            }} className='w-3 h-3'>
                                                <img className='w-full h-full' src={pin} alt="pin" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>

            </div>
            <div className='w-full'>
                {pinnednote.length > 0 && <h1 className='font-bold fon font-mono p-2 text-gray-200'>Others</h1>}
                <div className='notes w-full flex flex-wrap gap-5 items-start h-fit'>
                    {/* <div className='max-w-60 break-words p-5 border-2 border-gray-800 rounded-2xl bg-white' onClick={(e)=>{
                    copynote(e.currentTarget.lastElementChild.innerHTML)
                  }}>
                    <h1 className='font-bold'>{e.title}</h1>
                    <p>{e.text}</p>
                  </div> */}

                    {note.map((e) => {
                        if (e.deleted) {
                            return;
                        }
                        return (
                            <div onClick={() => { copied() }} key={e.id} className='relative max-w-60 max-h-70 overflow-hidden p-5 wrap-break-word border-2 border-black rounded-2xl hover:shadow-md cursor-copy hover:scale-101' style={{ backgroundColor: e.color }} onClick={() => {
                                copynote(e.text)
                            }}>

                                <h1 className='font-bold'>{e.title}</h1>
                                <p className=''>{e.text}</p>
                                <div className=" absolute bottom-0 left-0 w-full h-3 bg-gray-500"></div>
                                <div className='absolute flex gap-2 top-1 right-1 bg-gray-200 p-1 rounded-2xl'>
                                    <button onClick={(event) => {
                                        event.stopPropagation()
                                        handleDelete(e.id)
                                    }} className='w-3 h-3 '>
                                        <img className='w-full h-full' src={remove} alt="pin" />
                                    </button>
                                    <button onClick={(event) => {
                                        event.stopPropagation()
                                        handlePin(e.id)
                                    }} className='w-3 h-3 '>
                                        <img className='w-full h-full' src={pin} alt="pin" />
                                    </button>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </div>
            <div className='fixed text-green-400 font-mono font-bold right-2 bottom-2'>{copied ? "copied!" : ""}</div>
        </div>
    )
}

export default Notes