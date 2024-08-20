import { styled } from "@tanstack/react-query-devtools/build/lib/utils";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MoveBack from "./MoveBack";

const Form = styled.form`
  background-color: #fff;
  padding: 1rem 0.5rem;
  width: 65%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    width: 80%;
    height: 100%;
  }
  @media screen and (max-width: 480px) {
    padding: 1rem 0rem;
    width: 95%;
    height: 100%;
  }
`;
const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    justify-content: auto;
    align-items: center;
  }
`;
const InputGroup = styled.div`
  width: 40%;
  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;
const Span = styled.span`
  color: #e2070a;
`;
const Label = styled.label`
  display: inline-block;
  margin: 0.7rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 1px;
  @media screen and (max-width: 960px) {
    margin: 1rem;
  }
  @media screen and (max-width: 480px) {
    margin: 0.5rem;
    font-size: 0.8rem;
  }
`;
const Input = styled.input`
  display: block;
  background-color: #eee;
  border: 0.5px solid #ccc;
  width: 100%;
  outline: none;
  height: 1.5rem;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;
const Select = styled.select`
  display: block;
  background-color: #eee;
  border: 0.5px solid #ccc;
  width: 100%;
  outline: none;
  height: 2.85rem;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  letter-spacing: 2px;
  &:focus {
    background-color: #dff3ff;
  }
`;
const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 0.9rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  margin: 1rem 3.5rem;
  transition: active 0.5s linear;
  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;
export default function HistoryContainer() {
  return (
    <>
      <Header />
      <MoveBack />
      <Form action="">
        <FormRow>
          <InputGroup>
            <Label for="">
              Username:<Span>*</Span>
            </Label>
            <Input type="email" placeholder="jane@online.co" />
          </InputGroup>
          <Button>Search</Button>
        </FormRow>
      </Form>
      <Footer />
    </>
  );
}
