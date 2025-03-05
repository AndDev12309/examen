import API from "@/data";
import { Appointment } from "@/interfaces";
import buildUrl from "@/utils/buildParams";
import useSWR from "swr";

export const useAppointments = (options = {} as any) => {
  const query = buildUrl(options);
  const url = `appointments${query ? `?${query}` : ""}`;
  const { data, error, mutate } = useSWR<Appointment[]>(url, API.fetcher);

  return {
    appointments: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
