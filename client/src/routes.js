import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Main from "./pages/Main"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, MAIN_ROUTE } from "./untils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin 
    },
    {
        path: BASKET_ROUTE,
        Component: Basket 
    },
]

export const publicRoutes = [
    
    // {
    //     path: MAIN_ROUTE,
    //     Component: Main
    // },
    {
        path: SHOP_ROUTE,
        Component: Shop 
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth 
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth 
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage 
    },

]