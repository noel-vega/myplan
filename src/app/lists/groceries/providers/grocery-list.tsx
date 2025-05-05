import { createContext, PropsWithChildren, useContext, useState } from "react";
import { GroceryList, GroceryListItem } from "../types";

export type GroceryListContextType = {
  items: GroceryListItem[];
  addItem: (item: Omit<GroceryListItem, "id">) => void;
  editItem: (args: { itemId: string; item: Partial<GroceryListItem> }) => void;
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
      unitPrice: 4,
    },
    {
      id: crypto.randomUUID(),
      name: "12 Eggs",
      quantity: 1,
      unitPrice: 9,
    },
  ],
};

export function GroceryListProvider(props: PropsWithChildren) {
  const [items, setItems] = useState<GroceryListItem[]>(initGroceryList.items);

  const addItem = ({
    name,
    quantity,
    unitPrice,
  }: {
    name: string;
    quantity: number;
    unitPrice: number;
  }) => {
    const newItem: GroceryListItem = {
      id: crypto.randomUUID(),
      name,
      quantity,
      unitPrice,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== itemId);
    });
  };

  const editItem = (args: {
    itemId: string;
    item: Partial<GroceryListItem>;
  }) => {
    setItems((prev) => {
      return prev.map((i) => {
        if (i.id === args.itemId) {
          return { ...i, ...args.item };
        }
        return i;
      });
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
      value={{ items, addItem, removeItem, setItemQuantity, editItem }}
    >
      {props.children}
    </GroceryListContext.Provider>
  );
}
