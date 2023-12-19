import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import { AuthProvider } from './components/context/Auth.js'
import { Helmet } from "react-helmet";
import Dashboard from './pages/user/Dashboard.jsx'
import PrivateRoute from './components/routes/PrivateRoute.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import AdminRoute from './components/routes/AdminRoute.jsx'
import AdminDashboard from './pages/admin/AdminDashboad.jsx'
import CreateProduct from './pages/admin/CreateProduct.jsx'
import CreateCategory from './pages/admin/CreateCategory.jsx'
import Users from './pages/admin/Users.jsx'
import Profile from './pages/user/Profile.jsx'
import Orders from './pages/user/Orders.jsx'
import Products from './pages/admin/Products.jsx'
import UpdateProduct from './pages/admin/UpdateProduct.jsx'
import Search from 'antd/es/input/Search.js'
import { SearchProvider } from './components/context/Search.js'
import { CartProvider } from './components/context/CartContext.js'
import SearchPage from './pages/SearchPage.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Categories from './pages/Categories.jsx'
import CategoryProduct from './pages/CategoryProduct.jsx'
import Cart from './pages/Cart.js'
import AdminOrders from './pages/admin/AdminOrders.jsx'
import BecomeSeller from './pages/user/BecomeSeller.jsx'
import OrdersPage from './pages/admin/OrdersPage.jsx'
import SuperAdminRoute from './components/routes/SuperAdminRoute.jsx'
import AdminProfile from './pages/admin/AdminProfile.jsx'
import SuperAdminDashboard from './pages/superAdmin/SuperAdminDashboard.jsx'
import CreateSuperAdminCategory from './pages/superAdmin/CreateSuperAdminCategory.jsx'
import SuperProducts from './pages/superAdmin/SuperProducts.jsx'
import CreateSuperProduct from './pages/superAdmin/CreateSuperProduct.jsx'
import UpdateSuperProduct from './pages/superAdmin/UpdateSuperProducts.jsx'
import SuperAdminOrders from './pages/superAdmin/SuperAdminOrders.jsx'
import SuperAdminProfile from './pages/superAdmin/SuperAdminProfile.jsx'
import SuperAdminOrdersPage from './pages/superAdmin/SuperAdminOrdersPage.jsx'
import SuperSellers from './pages/superAdmin/SuperSellers.jsx'

const App = () => {
  return (
    <div>
     
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
      <Router>
      
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchPage />} />

         

          <Route path="/dashboard" element={<PrivateRoute />} >
           <Route path="user" element={<Dashboard />} />
           <Route path="user/profile" element={<Profile />} />
           <Route path="user/orders" element={<Orders />} />
           <Route path="user/become-a-seller" element={<BecomeSeller />} />
          </Route>


          <Route path='/dashboard' element={<SuperAdminRoute />}>
            <Route path='super-admin' element={<SuperAdminDashboard />} />
            <Route path='super-admin/create-category' element={<CreateSuperAdminCategory />} />
            <Route path='super-admin/create-product' element={<CreateSuperProduct />} />
            <Route path='super-admin/products' element={<SuperProducts />} />
            <Route path='super-admin/update-product/:slug' element={< UpdateSuperProduct />} />
            <Route path='super-admin/manage-orders' element={< SuperAdminOrders />} />
            <Route path='super-admin/profile' element={< SuperAdminProfile />} />
            <Route path='super-admin/orders' element={< SuperAdminOrdersPage />} />
            <Route path='super-admin/sellers' element={< SuperSellers />} />

          </Route>


          <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/manage-orders" element={<AdminOrders />} />
          <Route path="admin/orders" element={<OrdersPage />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="*" element={<PageNotFound />} />
          
        </Routes>
        <Footer/>
      </Router>
      </CartProvider>
      </SearchProvider>
      </AuthProvider>
    </div>
  )
}

export default App