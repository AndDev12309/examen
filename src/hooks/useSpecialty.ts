import API from "@/data";
import { Specialty } from "@/interfaces";
import buildUrl from "@/utils/buildParams";
import useSWR from "swr";

export const useSpecialty = (id?: string) => {
  const url = id ? `specialties/${id}` : null;
  const { data, error } = useSWR<Specialty>(url, API.fetcher, {
    revalidateOnFocus: false,
  });

  return {
    specialty: data,
    isLoading: !error && !data,
    isError: error,
  };
};
