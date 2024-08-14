import React, { useState } from "react";
import { css, styled } from "styled-components";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import AuthHeader from "../../components/AuthHeader";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { changePassword, getSession } from "../services/apiauth";
import { useSearchParams } from "react-router-dom";

const Body = styled.body`
  height: 70vh;
  background-color: #a0cee8;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  background-color: #fff;
  padding: 1rem 0.2rem;
  width: 35%;
  border-radius: 10px;
  padding: 2rem 1rem;
  @media screen and (max-width: 960px) {
    width: 80%;
  }
  @media screen and (max-width: 480px) {
    width: 90%;
    padding: 1.5rem 0.5rem;
  }
`;
const H2 = styled.h2`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;
const Span = styled.span`
  color: #e2070a;
`;
const Label = styled.label`
  display: inline-block;
  margin: 0.7rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1.5px;
  @media screen and (max-width: 480px) {
    display: block;
    margin: 10px 0px;
  }
`;
const Input = styled.input`
  display: block;
  background-color: #fff;
  border: 1.5px solid #0068a4;
  width: 70%;
  outline: none;
  height: 1.2rem;
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;
const InputGroup = styled.div`
  margin: 0 0.5rem;
  @media screen and (max-width: 480px) {
    margin: 0 0.1rem;
  }
`;
const Center = styled.div`
  text-align: center;
`;

const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 18px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.6rem 2rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: active 0.5s linear;
  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;

export default function ChangePassword() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const {
    isLoading,
    data: session,
    error,
  } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  const { mutate, isLoading: isChanging } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed Successfully");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const access_token = session.access_token;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!access_token) {
      toast.error("Access token is missing.");
      return;
    }

    mutate({ access_token, newPassword });
  };

  return (
    <>
      <AuthHeader />
      <Body>
        <Form onSubmit={handleResetPassword}>
          <H2>Create New Password</H2>

          <InputGroup>
            <Label name="password">
              Password:<Span>*</Span>
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="*******"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              min={6}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label name="password">
              Confirm Password:<Span>*</Span>
            </Label>
            <Input
              type="password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="*******"
              required
            />
          </InputGroup>

          <Center>
            <Button> Change Password</Button>
          </Center>
        </Form>
      </Body>
      <Footer />
    </>
  );
}
