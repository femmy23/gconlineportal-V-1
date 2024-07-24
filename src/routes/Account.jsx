import { useQuery } from "@tanstack/react-query";
import React from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { fetchAccount } from "../features/services/apiauth";

const H1 = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
`;
const H2 = styled.h2`
  font-weight: 600;
  margin: 0.5rem;
`;
const Acc = styled.div`
  margin: 3rem;
`;
const Body = styled.body`
  margin-bottom: 3rem;
`;
const ParaText = styled.div`
  font-size: 1.05rem;
`;
const Center = styled.div`
  text-align: center;
`;
const Img = styled.img`
  width: 20rem;
  height: 13rem;
`;
const Button = styled.button`
  width: 80%;
  height: 2.5rem;
  margin: 0.5rem;
  color: #fff;
  outline: none;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  background-color: #5e5ef0;
`;
const Table = styled.table`
  margin: 0 auto;
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-top: 5rem;
`;
const Tr = styled.tr`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const Th = styled.th`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const Td = styled.td`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.5rem;
`;
const Tf = styled.tfoot`
  text-align: center;
  border: none;
  padding: 0.5rem;
  margin: ;
`;

export default function Account() {
  let total = 0;
  const {
    isLoading,
    data: account,
    error,
  } = useQuery({
    queryKey: ["account"],
    queryFn: fetchAccount,
  });

  if (isLoading) return <Spinner />;

  if (account.length !== 0) {
    total = account
      ?.map((acc) => acc.bondPayment)
      ?.reduce((ac, cur) => Number(ac) + Number(cur))
      .toLocaleString();
  }

  return (
    <>
      <Header />
      <Body>
        <H1>My Account</H1>

        {account?.map((acc, i) => {
          return (
            <Acc key={i}>
              <Img src={acc.bankImageUrl} alt={`${acc.bankname} image`} />
              <H2>{acc.bankname}</H2>
              <ParaText>
                Start Date: {acc.startDate}
                <br />
                Maturity Date:{acc.maturityDate}
                <br />
                Bond Number: {acc.bondNumber}
                <br />
                Investment: €{acc.investment} <br />
                Annual Return: {acc.annualReturn}%
              </ParaText>
            </Acc>
          );
        })}

        <Table>
          <Tr>
            <Th>Start Date:</Th>
            <Th>Maturity Date:</Th>
            <Th>Bond Number</Th>
            <Th>Investment</Th>
            <Th>Annual Return</Th>
            <Th>Total Interest</Th>
            <Th>Bond Payments</Th>
          </Tr>
          {account?.map((acc, i) => {
            return (
              <Tr key={i}>
                <Td>{acc.startDate}</Td>
                <Td>{acc.maturityDate}</Td>
                <Td>{acc.bondNumber}</Td>
                <Td>€{acc.investment}</Td>
                <Td>{acc.annualReturn}%</Td>
                <Td>€{acc.totalInterest}</Td>
                <Td>€{acc.bondPayment}</Td>
              </Tr>
            );
          })}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Th>€{total}</Th>
          </Tr>
        </Table>

        <Center>
          <Button>View Itemised Payments</Button>
          <Button>View Bonds Total</Button>
        </Center>
      </Body>
      <Footer />
    </>
  );
}
