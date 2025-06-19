// import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Page-Imports.
import LoginPage from "./LoginPage";
import SuperUserPage from "./SuperUserPage";
import NormalUserPage from "./NormalUserPage.jsx";
import ManageProducts from "./ManageProducts.jsx";
import ManageUsers from "./ManageUsers.jsx"; // if Reactified
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// import ProtectedRoute from './components/ProtectedRoute';

function App() {
    // const [count, setCount] = useState(0);

    return (
      <Routes>
        {/* {/* Default redirect to login */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        
        {/* Public route */}
        {/* <Route path="/login" element={<LoginPage />} /> */}

        {/* <Route path="/superuser" element={<SuperUserPage />} /> */}
        {/* <Route path="/user" element={<NormalUserPage />} /> */}
        {/* <Route path="/products/manage" element={<ManageProducts />} /> */}
        {/* <Route path="/users/manage" element={<ManageUsers />} /> */}
      {/* </Routes> */}
        
        {/* Protected Routes version : */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/superuser" 
          element={
            <ProtectedRoute>
              <SuperUserPage />
            </ProtectedRoute>
            } 
        />
        
        <Route 
          path="/user" 
          element={
            <ProtectedRoute>
              <NormalUserPage />
            </ProtectedRoute>
            } 
        />

        <Route 
          path="/products/manage" 
          element={
            <ProtectedRoute>
              <ManageProducts />
            </ProtectedRoute>
            } 
        />

        <Route 
          path="/users/manage" 
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
            } 
        />

        {/* <Route path="/user" element={<NormalUserPage />} /> */}
        {/* <Route path="/products/manage" element={<ManageProducts />} /> */}
        {/* <Route path="/users/manage" element={<ManageUsers />} /> */}

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