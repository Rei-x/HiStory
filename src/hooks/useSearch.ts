import React from "react";
import { useQuery } from "react-query";
import { SearchResponse } from "../types/searchResponse";

export const useSearch = (search: string) => {
  return useQuery<SearchResponse>(["search", search], async () => {
    return (await fetch(`/api/search?searchPhrase=${search}`)).json();
  });
};
