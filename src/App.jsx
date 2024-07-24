import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Home from "./routes/Home";
import Account from "./routes/Account";
import PageNotFound from "./routes/PageNotFound";
import User from "./routes/User";
import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import Posts from "./routes/Posts";
import WithdrawDeposit from "./routes/WithdrawDeposit";
import Bonds from "./routes/Bonds";
import FixedTermDeposit from "./routes/FixedTermDeposit";
import "./App.css";
import ChangePassword from "./features/authentication/ChangePassword";
import ForgetPassword from "./features/authentication/ForgetPassword";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bonds" element={<Bonds />} />
            <Route path="/FixedTermDeposit" element={<FixedTermDeposit />} />
            <Route path="/WithdrawDeposit" element={<WithdrawDeposit />} />
            <Route path="/user" element={<User />} />
            <Route path="/post" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
