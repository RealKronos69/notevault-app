import github from '../assets/github.png'

const About = ()=>{
    return(
        <section className="h-screen bg-gray-800 flex justify-center items-center font-bold">
            <a href='https://github.com/RealKronos69' target="_blank" rel="noopener noreferrer" className="p-2 bg-white w-30 cursor-pointer text-gray-800 font-mono hover:scale-101 flex gap-5 items-center"><img className='w-5 h-5' src={github} alt="" />GitHub</a>
        </section>
    )
}

export default About