import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { styled } from "styled-components";
import Spinner from "../../components/Spinner";
import { getSession } from "../services/apiauth";
import Login from "./Login";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, data, error } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });

  if (isLoading) <Spinner />;

  return <div>{data ? children : <Login />}</div>;
}
