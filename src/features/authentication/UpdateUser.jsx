import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoveBack from "../../components/MoveBack";
import Spinner from "../../components/Spinner";
import {
  fetchProfile,
  Logout,
  updateUser,
  uploadAvatar,
} from "../services/apiauth";

const Body = styled.body`
  height: 100vh;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
const Container = styled.div`
  background-color: #fff;
  margin: 3rem;
  width: 60%;
  display: flex;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 90%;
    margin: 0;
  }
  @media screen and (max-width: 480px) {
    flex-direction: column;
    width: 90%;
    margin: 1.5rem 1rem;
  }
`;
const Left = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  gap: 1rem;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const First = styled.div`
  text-align: center;
  margin: 0 auto;
`;
const A = styled.a`
  text-decoration: none;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 98%;
`;
const H4 = styled.h4`
  font-size: 0.8rem;
  font-weight: 500;
  margin: 0.8rem;
  padding: 0;
`;
const Foremost = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;
const Span = styled.span`
  padding: 0.5rem;
  border-right: 1px solid #131313;
`;
const Right = styled.div`
  width: 70%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Form = styled.form`
  padding: 0.2rem;
  border-radius: 10px;
`;
const H2 = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;
const H5 = styled.h5`
  margin: 0;
  font-size: 1.3rem;
  text-align: center;
`;
const Label = styled.label`
  display: inline-block;
  margin: 0.7rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Red = styled.span`
  color: rgb(226, 7, 10);
`;
const Input = styled.input`
  display: block;
  background-color: #fff;
  border: 1.5px solid #0068a4;
  width: 80%;
  outline: none;
  height: 1.5rem;
  border-radius: 10px;
  padding: 10px;
  margin: 0 auto;
  font-size: 1rem;
  letter-spacing: 2px;
`;
const InputGroup = styled.div`
  margin: 0 0.5rem;
`;
const Button = styled.button`
  background-color: #5e5ef0;
  border-radius: 5px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 1.1rem;
  padding: 0.6rem 2rem;
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
const Avatar = styled.img`
  width: 9rem;
  height: 9rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

//get The fields Value
export default function User() {
  const [avatar_url, setAvatarUrl] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  if (isLoading) return <Spinner />;

  const onSubmit = async (data) => {
    console.log(data);
    const avatar = await uploadAvatar(file);

    data.avatar = avatar;

    mutate(data);
  };

  const { mutate: mutateLogout, isLoading: isloggingOut } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Logged out Successfully");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleLogout = () => {
    confirm("Are you sure you want to Logout");
    mutateLogout();
  };

  return (
    <>
      <Header />
      <MoveBack />
      <Body>
        <Container>
          <Left>
            <First>
              <Avatar
                src={data.avatar ? data?.avatar : " default-user.jpg"}
                alt="Avatar of "
              />
              <H5>{data.fullname}</H5>
              <A href="#"> View Profile</A>
            </First>
            <Options className="options">
              <Button onClick={() => toast.error("Not Authorized")}>
                Delete Account
              </Button>
              <Button onClick={() => toast.error("Email not Verified")}>
                Change Password
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Options>
          </Left>

          <Right>
            <H2>Account</H2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputGroup>
                <Label for="">
                  Full Name:<Red>*</Red>
                </Label>
                <Input
                  type="text"
                  id="fullname"
                  defaultValue={data?.fullname}
                  {...register("fullname")}
                />
              </InputGroup>

              <InputGroup className="input-group">
                <Label for="">
                  Username:<Red>*</Red>
                </Label>
                <Input
                  type="text"
                  id="username"
                  disabled
                  defaultValue={data?.username}
                />
              </InputGroup>

              <InputGroup className="input-group">
                <Label for="">
                  Email:<Red>*</Red>
                </Label>
                <Input
                  type="email"
                  id="email"
                  defaultValue={data?.email}
                  {...register("email")}
                />
              </InputGroup>

              <InputGroup>
                <Label for="">
                  Profile Image:<Red>*</Red>
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  value={avatar_url}
                  onChange={handleFile}
                />
              </InputGroup>

              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Updating" : "Update Profile"}
              </Button>
            </Form>
          </Right>
        </Container>
      </Body>
      <Footer />
    </>
  );
}
