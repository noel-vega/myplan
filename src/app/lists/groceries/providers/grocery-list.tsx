import { createContext, PropsWithChildren, useContext, useState } from "react";
import { GroceryList, GroceryListItem } from "../page";

export type GroceryListContextType = {
  items: GroceryListItem[];
  addItem: (item: Omit<GroceryListItem, "id">) => void;
  removeItem: (itemId: string) => void;
  setItemQuantity: (args: { itemId: string; quantity: number }) => void;
};

export const GroceryListContext = createContext<GroceryListContextType | null>(
  null
);

export function useGroceryList() {
  const groceryList = useContext(GroceryListContext);
  if (!groceryList) {
    throw new Error("GroceryListContext is not provided");
  }
  return groceryList;
}

const initGroceryList: GroceryList = {
  id: crypto.randomUUID(),
  name: "my first list",
  items: [
    {
      id: crypto.randomUUID(),
      name: "Milk",
      quantity: 2,
    },
    {
      id: crypto.randomUUID(),
      name: "Eggs",
      quantity: 12,
    },
  ],
};

export function GroceryListProvider(props: PropsWithChildren) {
  const [items, setItems] = useState<GroceryListItem[]>(initGroceryList.items);

  const addItem = ({ name, quantity }: { name: string; quantity: number }) => {
    const newItem: GroceryListItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== itemId);
    });
  };

  const setItemQuantity = ({
    itemId,
    quantity,
  }: {
    itemId: string;
    quantity: number;
  }) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  return (
    <GroceryListContext.Provider
      value={{ items, addItem, removeItem, setItemQuantity }}
    >
      {props.children}
    </GroceryListContext.Provider>
  );
}
