import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/style.scss";
import User from "./ui/User";
import Login from "./pages/Login/Login";
import AppLayout from "./ui/AppLayout";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to="login" />} /> */}

            <Route path="user" element={<User />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
            <Route path="forgot-password" element={<ForgetPassword />} />

            <Route path="user/:type" element={<User />} />
            <Route path="user/:type/:profile" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
