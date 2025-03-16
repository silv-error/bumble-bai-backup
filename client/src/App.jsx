import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import HomePage from "../src/pages/home/HomePage.jsx";

import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";
import ChangePasswordPage from "./pages/auth/forgot/ChangePasswordPage.jsx";

import ProfilePage from "../src/pages/profile/ProfilePage.jsx";
import ProductPage from "../src/pages/profile/ProductPage.jsx";
import EditProfile from "../src/pages/profile/EditProfile.jsx";
import EditProduct from "../src/pages/profile/EditProduct.jsx";
import EditAddress from "../src/pages/profile/EditAddress.jsx";
import LoadingSpinner from "./pages/components/common/LoadingSpinner.jsx";

function App() {

  const { data:authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        
        if(data.error) {
          return null;
        }

        if(!res.ok) {
          throw new Error(data.error || "Something went wrong"); 
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false
  });

  if(isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/forgot" element={<ChangePasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/update" element={<EditProfile />} />
        <Route path="/address" element={<ChangePasswordPage />} />
        <Route path="/address/update" element={<EditAddress />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/create" element={<EditProduct />} />
      </Routes>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
