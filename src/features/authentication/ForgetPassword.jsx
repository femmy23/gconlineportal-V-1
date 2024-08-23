import React from "react";
import { css, styled } from "styled-components";
import AuthHeader from "../../UI/AuthHeader";
import Footer from "../../UI/Footer";
import { toast } from "react-hot-toast";
import { supabase } from "../services/supabase";
import MoveBack from "../../components/MoveBack";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "../services/apiauth";

const Body = styled.div`
  height: 60vh;
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
    padding: 2rem 0.5rem;
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
  margin: 1rem;
  margin-top: 1.5rem;
  transition: active 0.5s linear;
  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;

export default function ForgetPassword(e) {
  const [email, setEmail] = useState("");

  const { mutate, isLoading: isSending } = useMutation({
    mutationFn: forgetPassword,
    onSuccess: () => {
      toast.success("Password Reset Link Sent");
      setEmail("");
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate(email);
  }

  return (
    <>
      <AuthHeader />
      <MoveBack />
      <Body>
        <Form onSubmit={handleSubmit}>
          <H2>Reset Password</H2>
          <InputGroup>
            <Label name="email">
              Email:<Span>*</Span>
            </Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dejzzy@info.uk"
            />
          </InputGroup>

          <Center>
            <Button disabled={isSending}>
              {isSending ? "Sending..." : "Send Link"}
            </Button>
          </Center>
        </Form>
      </Body>
      <Footer />
    </>
  );
}
