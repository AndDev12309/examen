import API from "@/data";
import { Patient } from "@/interfaces";
import buildUrl from "@/utils/buildParams";
import useSWR, { mutate } from "swr";

export const usePatient = (options = {} as any) => {
  const query = buildUrl(options);
  const url = `patients${query ? `?${query}` : ""}`;
  const { data, error, mutate } = useSWR<Patient[]>(url, API.fetcher, {
    revalidateOnFocus: false,
  });

  return {
    patient: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
