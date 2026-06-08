import { useState } from 'react'
import './index.css'
import './output.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import HomePage from './pages/HomePage'
import { Toaster, toast } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collection from './pages/Collection'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'
import OrdersConfirmationPage from './pages/OrdersConfirmationPage'
import OrderDetails from './pages/OrderDetails'
import MyOrdersPage from './pages/MyOrdersPage'
import AdminLayout from './components/Layout/AdminLayout'
import AdminHomepage from './pages/AdminHomepage'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProduct from './components/Admin/EditProduct'
import OrderManagement from './components/Admin/OrderManagement'

import { Provider } from "react-redux";
import store from './redux/store'
import ProtectedRoutes from './components/Common/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
      <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
      <Toaster position='top-right'/>

      <Routes>
        <Route path='/' element={<UserLayout/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path="/login"element={<Login/>}></Route>
        <Route path="/register"element={<Register/>}></Route>
        <Route path="/profile"element={<Profile/>}></Route>
        <Route path="/collections/:collection"element={<Collection/>}></Route>
        <Route path="/product/:id"element={<ProductDetails/>}></Route>
        <Route path="/checkout"element={<Checkout/>}></Route>
        <Route path="/order-confirmation" element={<OrdersConfirmationPage/>}></Route>
        <Route path="/order/:id" element={<OrderDetails/>}></Route>
        <Route path="/my-orders" element={<MyOrdersPage/>}></Route>
        
        </Route>

        {/*Admin Layout */}
        <Route path="/admin" element={<ProtectedRoutes role="admin"><AdminLayout/></ProtectedRoutes>}>
          <Route index element={<AdminHomepage/>}></Route>
          <Route path="users" element={<UserManagement/>}></Route>
          <Route path="products" element={<ProductManagement/>}></Route>
          <Route path="products/:id/edit" element={<EditProduct/>}></Route>
          <Route path="orders" element={<OrderManagement/>}></Route>

        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
