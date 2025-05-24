import {
  QueryOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createFeeding,
  deleteFeeding,
  getNewbornFeedingsByDate,
} from "./actions";
import { NewbornFeedingType } from "@/db/schema/newborn-feeding";

export function getUseNewbornFeedingsQueryOptions(
  date: string,
  options?: QueryOptions<NewbornFeedingType[]>
) {
  return queryOptions({
    ...options,
    queryKey: ["newbornFeedings"],
    queryFn: () => {
      console.log("Fetching feedings", date);
      return getNewbornFeedingsByDate(date);
    },
  });
}

export function useNewbornFeedings(
  date: string,
  options?: QueryOptions<NewbornFeedingType[]>
) {
  return useQuery(getUseNewbornFeedingsQueryOptions(date, options));
}

export function useCreateNewbornFeedingMutation() {
  return useMutation({
    mutationFn: createFeeding,
  });
}

export function useDeleteNewbornFeedingMutation() {
  return useMutation({
    mutationFn: deleteFeeding,
  });
}
