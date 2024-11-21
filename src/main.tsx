import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.tsx'

// insert all new pages as
/*
{
    path: [path]
    element: [element]
}
*/
const router = createBrowserRouter([
    { 
        // example
        path: "/",
        element: <App />
    },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
