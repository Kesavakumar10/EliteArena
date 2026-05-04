import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedPage from './components/Protected';
import Content from './components/Content'
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminAddProduct from "./components/admin/AdminAddProduct";
import AdminRoute from "./components/admin/AdminRoute";
import MyOrders from './components/MyOrders';
// import Main from './Page/Main'


export default function App(){
return (
<Routes>
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<Content/>} />
    <Route path="/protected" element={<ProtectedPage/>} />
    <Route
         path="/admin"
         element={
            <AdminRoute>
               <AdminDashboard />
            </AdminRoute>
         }
    />
    <Route
         path="/admin/add-product"
         element={
            <AdminRoute>
               <AdminAddProduct />
            </AdminRoute>
         }
    />
    {/* <Route path="/" element={<Login/>} /> */}
    <Route path="/products" element={<Content />} />
    <Route path="/contact" element={<Content />} />
    <Route path="/my-orders" element={<MyOrders />} />
</Routes>
);
}
