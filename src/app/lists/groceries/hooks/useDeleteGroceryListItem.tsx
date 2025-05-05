import { useMutation } from "@tanstack/react-query";
import { deleteGroceryListItem } from "../actions/grocery-list.actions";
import { queryClient } from "@/lib/react-query";
import { getUseGroceryListQueryOptions } from "./useGroceryList";

export function useDeleteGroceryListItem() {
  return useMutation({
    mutationFn: deleteGroceryListItem,
    onSuccess: ({ groceryListId }) => {
      queryClient.invalidateQueries(
        getUseGroceryListQueryOptions({ id: groceryListId })
      );
    },
  });
}
