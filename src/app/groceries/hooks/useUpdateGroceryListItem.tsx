import { useMutation } from "@tanstack/react-query";
import { updateGroceryListItem } from "../actions";

export function useUpdateGroceryListItem() {
  return useMutation({
    mutationFn: updateGroceryListItem,
  });
}
