import { queryOptions, useQuery } from "@tanstack/react-query";
import { getGroceryList } from "../actions/grocery-list.actions";

export function getUseGroceryListQueryOptions({ id }: { id: number }) {
  return queryOptions({
    queryKey: ["groceryList"],
    queryFn: () => getGroceryList({ id }),
  });
}

export function useGroceryList({ id }: { id: number }) {
  return useQuery({ ...getUseGroceryListQueryOptions({ id }) });
}
