import React from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import MainMenu from './pages/MainMenu.tsx'
import CategoryMenu from './pages/CategoryMenu.tsx'
import ItemViewPage from './pages/ItemViewPage.tsx'
import CartPage from './pages/CartPage.tsx'

// insert all new pages as
/*
{
    path: [path]
    element: [element]
}
*/
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu />
    },
    {
        path: '/browse',
        element: <CategoryMenu/>
    },
    {
        path: "/browse/customize",
        element: <ItemViewPage/>
    },
    {
        path: "/cart",
        element: <CartPage/>,
    },
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
