import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { styled } from "styled-components";
import { useMoveBack } from "../features/services/useMoveBack";

const Container = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
`;
const Button = styled.button`
  display: flex;
  flex-direction: center;
  align-items: center;
  gap: 5px;
  background-color: #5e5ef0;
  border-radius: 18px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 1rem;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  margin: 1rem;
  transition: active 0.5s linear;
  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;

export default function MoveBack() {
  const back = useMoveBack();

  return (
    <Container>
      <Button onClick={back}>
        <FaArrowLeft /> Back
      </Button>
    </Container>
  );
}
