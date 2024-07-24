import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import { fetchProfile } from "../features/services/apiauth";
import PageNotFound from "./PageNotFound";

export default function Posts() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  if (isLoading) return <Spinner />;
  if (!data.is_admin) return <PageNotFound />;

  return <PostForm account={data} />;
}
