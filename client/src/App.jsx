import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import LoadingSpinner from "./components/common/LoadingSpinner.jsx";

import HomePage from "../src/pages/home/HomePage.jsx";

import LoginPage from "./pages/login/LoginPage.jsx";
import SignUpPage from "./pages/signup/SignUpPage.jsx";
import ChangePasswordPage from "./pages/forgot/ChangePasswordPage.jsx";

import ProfilePage from "../src/pages/profile/ProfilePage.jsx";
import ProductPage from "../src/pages/profile/ProductPage.jsx";
import AddressPage from "../src/pages/profile/AddressPage.jsx";

import {useAuthContext} from "../src/context/UserAuthContext.jsx"


function App() {

  const {authUser} = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/forgot" element={<ChangePasswordPage />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to={"/login"} />} />
        <Route path="/address" element={authUser? <AddressPage /> : <Navigate to={"/login"} />} />
        <Route path="/products" element={authUser? <ProductPage /> : <Navigate to={"/login"} />} />
      </Routes>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
