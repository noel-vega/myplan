import {
  QueryOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { createFeeding, deleteFeeding, getNewbornFeedings } from "./actions";
import { NewbornFeedingType } from "@/db/schema/newborn-feeding";

export function getUseNewbornFeedingsQueryOptions(
  queryOptionsConfig?: QueryOptions<NewbornFeedingType[]>
) {
  console.log("initial data", queryOptionsConfig?.initialData);
  return queryOptions({
    queryKey: ["newbornFeedings"],
    queryFn: getNewbornFeedings,

    ...queryOptionsConfig,
  });
}

export function useNewbornFeedings(
  options?: QueryOptions<NewbornFeedingType[]>
) {
  return useQuery(getUseNewbornFeedingsQueryOptions(options));
}

export function useCreateNewbornFeedingMutation() {
  return useMutation({
    mutationFn: createFeeding,
  });
}

export function useDeleteNewbornFeedingMutation() {
  return useMutation({
    mutationFn: (id: number) => {
      return deleteFeeding(id);
    },
  });
}
