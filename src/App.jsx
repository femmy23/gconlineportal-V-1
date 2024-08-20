import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Home from "./routes/Home";
import Account from "./routes/Account";
import PageNotFound from "./routes/PageNotFound";
import User from "./routes/User";
import Posts from "./routes/Posts";
import History from "./routes/History";
import Bonds from "./routes/Bonds";
import FixedTermDeposit from "./routes/FixedTermDeposit";
import WithdrawDeposit from "./routes/WithdrawDeposit";

import AppLayout from "./components/AppLayout";

import Login from "./features/authentication/Login";
import Signup from "./features/authentication/Signup";
import ChangePassword from "./features/authentication/ChangePassword";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import ForgetPassword from "./features/authentication/ForgetPassword";

import "./App.css";

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
            <Route path="/history" element={<History />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/changePassword" element={<ChangePassword />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
