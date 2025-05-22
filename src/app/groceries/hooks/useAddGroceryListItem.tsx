import { useMutation } from "@tanstack/react-query";
import { addGroceryListItem } from "../actions";
import { getUseGroceryListQueryOptions } from "./useGroceryList";
import { getQueryClient } from "@/app/providers/react-query";

export function useAddGroceryListItemMutation() {
  return useMutation({
    mutationFn: addGroceryListItem,
    onSuccess: () => {
      getQueryClient().invalidateQueries(getUseGroceryListQueryOptions());
    },
  });
}
