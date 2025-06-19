// import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Page-Imports.
import LoginPage from "./LoginPage";
import SuperUserPage from "./SuperUserPage";
import NormalUserPage from "./NormalUserPage.jsx";
import ProtectedRoute from './components/ProtectedRoute';
import ManageProducts from "./ManageProducts.jsx";
import ManageUsers from "./ManageUsers.jsx"; // if Reactified

function App() {
    // const [count, setCount] = useState(0);

    return (
      <Routes>
        {/* Default redirect to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="/superuser" element={<SuperUserPage />} />
        <Route path="/user" element={<NormalUserPage />} />
        <Route path="/products/manage" element={<ManageProducts />} />
        <Route path="/users/manage" element={<ManageUsers />} />

        {/* Protected Routes*/}
        {/* <Route
              path="/superuser"
              element={
                <ProtectedRoute>
                  <SuperUserPage />
                </ProtectedRoute>
              }
            /> 
            <Route
              path="/normaluser"
              element={
                <ProtectedRoute>
                  <NormalUserPage />
                </ProtectedRoute>
              }
            />
      />
        */}
        {/* Add more routes as needed */}
      </Routes>
       
    );
}

export default App;
// <>
//    <LoginPage />
// </>