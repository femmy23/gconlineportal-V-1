import React from "react";
import { styled } from "styled-components";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import MoveBack from "../components/MoveBack";

export default function PageNotFound() {
  const Body = styled.body`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const H3 = styled.h3`
    font-size: 1.5rem;
    text-align: "center";
    margin: 1rem 0;
  `;
  const H1 = styled.h1`
    text-align: "center";
  `;
  return (
    <>
      <Header />
      <MoveBack />
      <Body>
        <H1>
          <H3>Error 404 🚫🚨</H3>PageNotFound
        </H1>
      </Body>
      <Footer />
    </>
  );
}
