import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import AddEditProductPage from "./pages/CRUDProductPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import GenerateOrderPage from "./pages/GenerateOrderPage";
import ProfilePage from "./pages/ProfilePage";
import SupplierPage from "./pages/SupplierPage";
import ClientPage from "./pages/ClientPage";
import AddEditSupplierPage from "./pages/CRUDSupplierPage";
import AddEditClientPage from "./pages/CRUDClientPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>

        {/*ADMIN ROUTES*/}
        <Route path="/register" element={<AdminRoute element={<RegisterPage/>}/>}/>
        <Route path="/category" element={<AdminRoute element={<CategoryPage/>}/>}/>
        <Route path="/product" element={<AdminRoute element={<ProductPage/>}/>}/>
        <Route path="/supplier" element={<AdminRoute element={<SupplierPage/>}/>}/>
        <Route path="/add-supplier" element={<AdminRoute element={<AddEditSupplierPage/>}/>}/>
        <Route path="/edit-supplier/:supplierId" element={<AdminRoute element={<AddEditSupplierPage/>}/>}/>
        <Route path="/client" element={<AdminRoute element={<ClientPage/>}/>}/>
        <Route path="/add-client" element={<AdminRoute element={<AddEditClientPage/>}/>}/>
        <Route path="/edit-client/:clientId" element={<AdminRoute element={<AddEditClientPage/>}/>}/>

        <Route path="/add-product" element={<AdminRoute element={<AddEditProductPage/>}/>}/>
        <Route path="/edit-product/:productId" element={<AdminRoute element={<AddEditProductPage/>}/>}/>
        
        {/* ADMIN AND MANAGERS ROUTES */}
        <Route path="/create_order" element={<ProtectedRoute element={<GenerateOrderPage/>}/>}/>
        <Route path="/orders" element={<ProtectedRoute element={<OrderPage/>}/>}/>
        <Route path="/orders/:orderId" element={<ProtectedRoute element={<OrderDetailsPage/>}/>}/>
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage/>}/>}/>

        <Route path="*" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
