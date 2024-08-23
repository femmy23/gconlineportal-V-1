import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { styled } from "styled-components";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import { updateAccount, uploadBankImage } from "../features/services/apiauth";
import MoveBack from "./MoveBack";
import { FaTimes } from "react-icons/fa";
import { supabase } from "../features/services/supabase";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  transition: all 0.5s;
`;
const Modal = styled.div`
  top: 15%;
  left: 25%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 70%;
  background-color: #fff;
  box-shadow: 0 4rem 6rem rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.5s;
  border-radius: 20px;
  @media screen and (max-width: 960px) {
    width: 80%;
    height: 55%;
    top: 20%;
    left: 10%;
  }
  @media screen and (max-width: 480px) {
    padding: 1rem 0rem;
    width: 88%;
    height: 85%;
  }
`;
const Form = styled.form`
  overflow: scroll;
  background-color: #fff;
  padding: 1rem 0.5rem;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 960px) {
    width: 80%;
    height: 100%;
  }
  @media screen and (max-width: 480px) {
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

const H3 = styled.h3`
  text-align: center;
  color: #333;
  margin: 0.5rem;
`;
const H2 = styled.h2`
  text-align: center;
  color: #333;
`;
const Center = styled.div`
  text-align: center;
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
const Cancel = styled.button`
  z-index: 1000;

  position: absolute;
  top: 1rem;
  right: 1rem;
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
  margin: 1rem;
  transition: active 0.5s linear;
  &:hover {
    background-color: #5151d1;
  }
  &:active {
    transform: scale(0.88);
  }
`;

export default function EditAccountForm({
  account: accounts,
  user: username,
  i,
  closeForm,
}) {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const editAccount = accounts[i];

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const { mutate, isLoading: isEditing } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["account"] });
      closeForm();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = async (data) => {
    let totalInterest = Number(
      (data.annualReturn / 100) * data.investment
    ).toFixed(2);
    let bondPayment = Number(
      Number(data.investment) + Number(totalInterest)
    ).toFixed(2);
    let monthlyInterest = Number(totalInterest / 12).toFixed(2);

    const bankImageUrl = await uploadBankImage(file);

    const newAccount = await {
      ...data,
      monthlyInterest,
      bondPayment,
      totalInterest,
      bankImageUrl,
    };
    const current = accounts || [];

    const updatedAccounts = current.map((acc, index) => {
      if (index === i) {
        return { ...acc, ...newAccount };
      }
      return acc;
    });

    mutate({ username, updatedAccounts });
  };
  return (
    <>
      <Modal>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <H2>Edit Post</H2>
          <Cancel onClick={closeForm}>
            <FaTimes />
          </Cancel>

          <FormRow>
            <InputGroup>
              <Label for="">
                Bank Name:<Span>*</Span>
              </Label>
              <Input
                type="text"
                defaultValue={editAccount.bankname}
                placeholder="Wells Fargo"
                id="bankname"
                {...register("bankname")}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label for="">
                Bank Image:<Span>*</Span>
              </Label>
              <Input
                type="file"
                accept="image/*"
                value={image}
                onChange={handleFile}
                required
              />
            </InputGroup>
          </FormRow>

          <H3>About Bond</H3>
          <FormRow>
            <InputGroup>
              <Label for="">
                Start Date:<Span>*</Span>
              </Label>
              <Input
                type="date"
                placeholder="mm/dd/yy"
                id="startDate"
                defaultValue={editAccount.startDate}
                {...register("startDate")}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label for="">
                Maturity Date:<Span>*</Span>
              </Label>
              <Input
                type="date"
                placeholder="mm/dd/yy"
                defaultValue={editAccount.maturityDate}
                id="maturityDate"
                {...register("maturityDate")}
                required
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label for="">
                Bond Number:<Span>*</Span>
              </Label>
              <Input
                type="text"
                id="bondNumber"
                defaultValue={editAccount.bondNumber}
                {...register("bondNumber")}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label for="">
                Investment:<Span>*</Span>
              </Label>
              <Input
                type="number"
                step="0.01"
                id="investment"
                defaultValue={editAccount.investment}
                {...register("investment")}
                required
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label for="">
                Annual Return:<Span>*</Span>
              </Label>
              <Input
                type="number"
                step="0.01"
                id="annualReturn"
                defaultValue={editAccount.annualReturn}
                {...register("annualReturn")}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label for="">
                Bond Type:<Span>*</Span>
              </Label>
              <Select
                id="bondType"
                defaultValue={editAccount.bondType}
                {...register("bondType")}
              >
                <option value="fixed-term-deposit">Fixed Term Deposit</option>
                <option value="bond">Bonds</option>
              </Select>
            </InputGroup>
          </FormRow>
          <Center>
            <Button disabled={isEditing}>
              {isEditing ? "Updating..." : "Update"}
            </Button>
          </Center>
        </Form>
      </Modal>
      <Overlay onClick={closeForm} />
    </>
  );
}
