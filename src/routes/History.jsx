import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../features/services/apiauth";
import Spinner from "../UI/Spinner";
import PageNotFound from "./PageNotFound";
import HistoryContainer from "../components/HistoryContainer";

export default function History() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  if (isLoading) return <Spinner />;
  if (!data.is_admin) return <PageNotFound />;

  return <HistoryContainer />;
}
