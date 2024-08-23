import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { styled } from "styled-components";
import {
  deleteAccount,
  fetchAccountPassword,
  fetchUsernames,
} from "../features/services/apiauth";
import EditAccountForm from "./EditAccountForm";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import MoveBack from "./MoveBack";
import Selects from "../UI/Select";
import Select from "../UI/Select";

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
  gap: 5rem;
  align-items: flex-end;
  justify-content: center;
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
// const Select = styled.select`
//   display: block;
//   background-color: #eee;
//   border: 0.5px solid #ccc;
//   width: 100%;
//   outline: none;
//   height: 2.85rem;
//   border-radius: 5px;
//   padding: 10px;
//   font-size: 1rem;
//   letter-spacing: 2px;
//   &:focus {
//     background-color: #dff3ff;
//   }
// `;
const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 0.9rem;
  padding: 0.6rem 1rem;
  cursor: pointer;
  transition: active 0.5s linear;
  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
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
const Edit = styled.button`
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
  margin: 0 5px;

  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;
const H2 = styled.h2`
  margin: 1rem;
  color: #f17777;
`;

export default function HistoryContainer() {
  const [username, setUsername] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [index, setIndex] = useState(null);
  const queryClient = useQueryClient();

  const handleEdit = (i) => {
    setShowForm(true);
    setIndex(i);
  };
  const closeForm = (i) => {
    setShowForm(false);
  };

  const {
    isLoading: fetchingUsername,
    data: usernames,
    error: usernameError,
  } = useQuery({
    queryKey: ["username"],
    queryFn: fetchUsernames,
  });

  const { mutate: toDelete, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function handleDelete(i) {
    const check = confirm("Are you sure you want to delete");
    if (!check) return;
    toDelete(i);
  }

  const {
    isLoading,
    data: accounts,
    error,
    refetch,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => fetchAccountPassword(username),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <>
      <Header />
      <MoveBack />
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <InputGroup>
            <Label for="">
              Username:<Span>*</Span>
            </Label>

            {!usernames ? (
              ""
            ) : (
              <Selects
                usernames={usernames}
                value={username}
                change={setUsername}
              />
            )}
          </InputGroup>
          <Button>Search</Button>
        </FormRow>
      </Form>

      <Table>
        {!accounts?.length ? (
          ""
        ) : (
          <Tr>
            <Th>Start Date</Th>
            <Th>Maturity Date</Th>
            <Th>Bank Name</Th>
            <Th>Bond Number</Th>
            <Th>Bond Type</Th>
            <Th>Investment</Th>
            <Th>Annual Return</Th>
            <Th>Monthly Interest </Th>
            <Th>Total Interest</Th>
            <Th>Bond Payments</Th>
            <Th>Actions</Th>
          </Tr>
        )}
        {accounts?.map((acc, i) => {
          return (
            <Tr key={i}>
              <Td>{acc.startDate}</Td>
              <Td>{acc.maturityDate}</Td>
              <Td>{acc.bankname}</Td>
              <Td>{acc.bondNumber}</Td>
              <Td>{acc.bondType}</Td>
              <Td>€{acc.investment}</Td>
              <Td>{acc.annualReturn}%</Td>
              <Td>€{acc.monthlyInterest}</Td>
              <Td>€{acc.totalInterest}</Td>
              <Td>€{acc.bondPayment}</Td>
              <Td>
                <Edit onClick={() => handleEdit(i)}>
                  <FaEdit />
                </Edit>
                <Edit onClick={() => handleDelete(i)}>
                  <FaTrashAlt />
                </Edit>
              </Td>
            </Tr>
          );
        })}
      </Table>

      <section>
        {!showForm ? (
          ""
        ) : (
          <EditAccountForm
            account={accounts}
            user={username}
            i={index}
            closeForm={closeForm}
          />
        )}
      </section>
      <Footer />
    </>
  );
}
