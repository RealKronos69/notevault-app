import { createBrowserRouter } from "react-router-dom"
import { useState } from "react"
import Notes from './components/notes'
import Pinned from './components/pinned'
import Bin from './components/bin'
import About from './components/about'
import App from './App'



const Routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Notes />,
            },
            {
                path: "/pinnednotes",
                element: <Pinned />,
            },
            {
                path: '/bin',
                element: <Bin />,
            },
            {
                path: '/about',
                element: <About />
            }
        ],

    },

])


export default Routes