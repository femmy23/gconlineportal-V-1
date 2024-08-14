import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { FaTrashAlt, FaTrashRestore } from "react-icons/fa";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MoveBack from "../components/MoveBack";
import Spinner from "../components/Spinner";
import { deleteAccount, fetchAccount } from "../features/services/apiauth";

const H1 = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
`;
const H2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem;
`;
const H5 = styled.h5`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 4rem;
`;
const Acc = styled.div`
  margin: 3rem;
`;
const ParaText = styled.div`
  font-size: 1.2rem;
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
  padding: 0.4rem;
`;
const Th = styled.th`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.4rem;
`;
const Td = styled.td`
  text-align: center;
  border: 1px solid #ccc;
  padding: 0.4rem;
`;
const Tf = styled.tfoot`
  text-align: center;
  border: none;
  padding: 0.4rem;
  margin: ;
`;
const Body = styled.body`
  margin-bottom: 3rem;
`;
const Delete = styled.button`
  /* color: #000; */
  outline: none;
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.1s ease-in-out;
  background-color: #5e5ef0;
  color: #fff;

  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;

export default function FixedTermDeposit() {
  let total = 0;
  const queryClient = useQueryClient();

  const { mutate, isLoading: isChanging } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["account"],
    queryFn: fetchAccount,
  });

  if (isLoading) {
    return <Spinner />;
  }
  const account = data?.filter((acc) => acc.bondType === "fixed-term-deposit");

  if (account.length !== 0) {
    total = account
      ?.map((acc) => acc.bondPayment)
      ?.reduce((ac, cur) => Number(ac) + Number(cur))
      .toLocaleString();
  }

  function handleDelete(i) {
    confirm("Are you sure you want to delete");
    mutate(i);
  }
  return (
    <>
      <Header />
      <MoveBack />
      <Body>
        <H1>Fixed Term Deposit</H1>

        {account?.map((acc, i) => {
          return (
            <Acc key={i}>
              <H2>{acc.bankname}</H2>
              <Img src={acc.bankImageUrl} alt={`${acc.bankname} image`} />
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
            <Th>Monthly Interest </Th>
            <Th>Total Interest</Th>
            <Th>Bond Payments</Th>
            <Th>Action</Th>
          </Tr>
          {account?.map((acc, i) => {
            return (
              <Tr key={i}>
                <Td>{acc.startDate}</Td>
                <Td>{acc.maturityDate}</Td>
                <Td>{acc.bondNumber}</Td>
                <Td>€{acc.investment}</Td>
                <Td>{acc.annualReturn}%</Td>
                <Td>€{acc.monthlyInterest}%</Td>
                <Td>€{acc.totalInterest}</Td>
                <Td>€{acc.bondPayment}</Td>
                <Td>
                  <Delete onClick={() => handleDelete(i)}>
                    <FaTrashAlt />
                  </Delete>
                </Td>
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
