import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { styled, css } from "styled-components";
import { fetchProfile, Logout } from "../features/services/apiauth";
import DropDown from "./DropDown";
import { MenuItems } from "./MenuItems";
import Spinner from "./Spinner";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  @media screen and (max-width: 480px) {
    margin: 0 1rem;
  }
`;

const Logo = styled.div`
  width: 13rem;
  height: 4rem;
`;
const Img = styled.img`
  z-index: 1000;
  width: 100%;
  height: 100%;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 4 rem;

  ${(props) =>
    props.type === "inactive" &&
    css`
      @media screen and (max-width: 900px) {
        display: none;
      }
    `}
  ${(props) =>
    props.type === "active" &&
    css`
      @media screen and (max-width: 900px) {
        align-items: stretch;
        padding: 80px 0 30px 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background: #eee;
        position: absolute;
        width: 100%;
        height: auto;
        top: 0;
        left: 0;
        opacity: 1;
        transition: var(--transition);
        border-radius: 13px;
        z-index: 10;
      }
    `};
`;
const Li = styled.li`
  display: flex;
  list-style: none;
  margin: 0 1rem;
  padding: 1.5rem 0;
  align-self: center;
`;
const MenuIcon = styled.div`
  font-size: 1.3rem;
  display: none;
  z-index: 1000;
  @media screen and (max-width: 960px) {
    display: block;
  }
`;
const A = styled.a`
  color: #222;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  &:hover {
    color: #5e5ef0;
  }

  ${(props) =>
    props.type === "button" &&
    css`
      padding: 0.4rem 1rem;
      border-radius: 5px;
      color: #fff;
      background-color: #5e5ef0;
      transition: active 0.5s linear;
      &:hover {
        background-color: #5151d1;
      }
      &:active {
        transform: scale(0.88);
      }
      @media screen and (max-width: 900px) {
        display: block;
        text-align: center;
      }
    `}
`;
const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 1rem;
  border-radius: 5px;
  color: #fff;
  background-color: #5e5ef0;
  &:hover {
    background-color: #5151d1;
    color: #fff;
  }
  @media screen and (max-width: 900px) {
    display: block;
    text-align: center;
  }
`;

export default function Header() {
  const [clicked, setClicked] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading: isloggingOut } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      toast.success("Logged out Successfully");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleLogout = () => {
    confirm("Are you sure you want to Logout");
    mutate();
  };

  const onToggle = function () {
    setClicked(!clicked);
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  if (isLoading) return <Spinner />;

  return (
    <>
      <HeaderContainer>
        <Logo className="logo">
          <Img src="./logo.png" href="/home" alt="logo" />
        </Logo>
        <MenuIcon onClick={onToggle}>
          {clicked ? <FaTimes /> : <FaBars />}
        </MenuIcon>
        <Ul type={clicked ? "active" : "inactive"}>
          {MenuItems.map((item, i) => {
            if (item.title === "Account") {
              return (
                <Li
                  key={i}
                  onMouseEnter={() => setDropdown(true)}
                  onMouseLeave={() => setDropdown(false)}
                >
                  <Link to={item.url} style={{ textDecoration: "none" }}>
                    <A type={item.type}>
                      {item.title}
                      {item.icon}
                    </A>
                    {dropdown && <DropDown />}
                  </Link>
                </Li>
              );
            }
            return (
              <Li key={i}>
                <Link to={item.url} style={{ textDecoration: "none" }}>
                  <A type={item.type}>{item.title}</A>
                </Link>
              </Li>
            );
          })}
          {data.is_admin ? (
            <Li>
              <Link to="/post" style={{ textDecoration: "none" }}>
                <A type="nav-links">Post</A>
              </Link>
            </Li>
          ) : (
            ""
          )}

          <Button onClick={handleLogout}>Logout </Button>
        </Ul>
      </HeaderContainer>
    </>
  );
}
