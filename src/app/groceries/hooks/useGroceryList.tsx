import { QueryOptions, queryOptions, useQuery } from "@tanstack/react-query";
import { getGroceryCart, getGroceryList } from "../actions";
import { GroceryListItemType } from "@/db/schema/groceries";

type Options = QueryOptions<GroceryListItemType[]>;

export function getUseGroceryListQueryOptions(options: Options = {}) {
  return queryOptions({
    ...options,
    queryKey: ["groceryList"],
    queryFn: getGroceryList,
  });
}

export function useGroceryList(options: Options = {}) {
  return useQuery(getUseGroceryListQueryOptions(options));
}

export function getUseGroceryCartQueryOptions(options: Options = {}) {
  return queryOptions({
    ...options,
    queryKey: ["groceryCart"],
    queryFn: getGroceryCart,
  });
}

export function useGroceryCart(options: Options = {}) {
  return useQuery(getUseGroceryCartQueryOptions(options));
}
