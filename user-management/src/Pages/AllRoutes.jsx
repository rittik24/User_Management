/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import VarifyOtp from "./VarifyOtp";
import UserManagement from "./UserManagement";


export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/varifyotp" element={<VarifyOtp />} />
        <Route path="/UserManagement" element={<UserManagement />} />
      </Routes>
    </div>
  );
};
