import API from "@/data";
import { Specialty } from "@/interfaces";
import buildUrl from "@/utils/buildParams";
import useSWR from "swr";

export const useSpecialties = (options = {} as any) => {
  const query = buildUrl(options);
  const url = `specialties${query ? `?${query}` : ""}`;
  const { data, error, mutate } = useSWR<Specialty[]>(url, API.fetcher);

  return {
    specialties: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
