import React from "react";
import { css, styled } from "styled-components";
import toast from "react-hot-toast";
import Footer from "../../components/Footer";
import AuthHeader from "../../components/AuthHeader";

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
`;

export default function ChangePassword() {
  return (
    <>
      <AuthHeader />
      <Body>
        <Form onSubmit={handleSubmit}>
          <H2>Create New Password</H2>

          <InputGroup>
            <Label name="password">
              Password:<Span>*</Span>
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="*******"
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
              placeholder="*******"
              required
            />
          </InputGroup>

          <Center>
            <Button> ChangePassword</Button>
          </Center>
        </Form>
      </Body>
      <Footer />
    </>
  );
}
