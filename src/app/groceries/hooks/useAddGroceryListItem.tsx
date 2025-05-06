import { useMutation } from "@tanstack/react-query";
import { addGroceryListItem } from "../actions/grocery-list.actions";
import { queryClient } from "@/lib/react-query";
import { getUseGroceryListQueryOptions } from "./useGroceryList";

export function useAddGroceryListItem() {
  return useMutation({
    mutationFn: addGroceryListItem,
    onSuccess: ({ groceryListId }) => {
      queryClient.invalidateQueries(
        getUseGroceryListQueryOptions({ id: groceryListId })
      );
    },
  });
}
