import { useMutation } from "@tanstack/react-query";
import { deleteGroceryListItem } from "../actions";
import { getUseGroceryListQueryOptions } from "./useGroceryList";
import { getQueryClient } from "@/app/providers/react-query";

export function useDeleteGroceryListItem() {
  return useMutation({
    mutationFn: deleteGroceryListItem,
    onSuccess: () => {
      getQueryClient().invalidateQueries(getUseGroceryListQueryOptions());
    },
  });
}
