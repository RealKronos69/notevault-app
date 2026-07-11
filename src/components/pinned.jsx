import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import pin from '../assets/pin.png'
import remove from '../assets/remove.png'

const Pinned = () => {
    const { note, setnote } = useOutletContext();
    const [copied, setcopied] = useState(false)
    const handlePin = (id) => {
        setnote((note) => {
            return note.map((NOTE) => {
                return NOTE.id === id ? { ...NOTE, pinned: !NOTE.pinned } : NOTE
            })
        })
    }

    function copynote(notecontent) {
        navigator.clipboard.writeText(notecontent)
        setcopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setcopied(false)
        }, 1500);
    }


    return (
        <section className='p-5 overflow-y-auto scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-amber-50 h-screen bg-gray-800'>
            <h1 className='font-bold fon font-mono p-2 text-gray-200'>Pinned Notes:</h1>
            <div className="flex flex-wrap gap-5 items-start h-fit">
                {
                    note.map((e) => {
                        if (e.pinned) {
                            return (
                                <div key={e.id} className='relative overflow-hidden max-w-60 max-h-70 wrap-break-word p-5 border-2 border-black rounded-2xl hover:shadow-md cursor-copy hover:scale-101' style={{ backgroundColor: e.color }} onClick={() => {
                                    copynote(e.text)
                                }}>
                                    <h1 className='font-bold'>{e.title}</h1>
                                    <p className=''>{e.text}</p>
                                    <div className=" absolute bottom-0 left-0 w-full h-3 bg-amber-500"></div>
                                    <div className='absolute flex gap-2 top-1 right-1 bg-gray-200 p-1 rounded-2xl'>

                                        <button onClick={(event) => {
                                            event.stopPropagation()
                                            handlePin(e.id)
                                        }} className='w-3 h-3 '>
                                            <img className='w-full h-full' src={pin} alt="pin" />
                                        </button>
                                    </div>
                                </div>

                            )
                        }
                    })
                }
            </div>
            <div className='fixed text-green-400 font-mono font-bold right-2 bottom-2'>{copied ? "copied!" : ""}</div>
        </section>
    )
}

export default Pinned