import { useMutation } from "@tanstack/react-query";
import { updateGroceryListItem } from "../actions/grocery-list.actions";
import { queryClient } from "@/lib/react-query";
import { getUseGroceryListQueryOptions } from "./useGroceryList";

export function useUpdateGroceryListItem() {
  return useMutation({
    mutationFn: updateGroceryListItem,
    onSuccess: ({ groceryListId }) => {
      queryClient.invalidateQueries(
        getUseGroceryListQueryOptions({ id: groceryListId })
      );
    },
  });
}
