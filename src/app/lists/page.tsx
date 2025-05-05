"use client";
import Link from "next/link";
import { useGroceryList } from "../providers/grocery-list";
import { PropsWithChildren } from "react";
import {
  BrushCleaningIcon,
  ShoppingBasketIcon,
  SproutIcon,
  TicketIcon,
} from "lucide-react";

export default function CategoryListPage() {
  return (
    <section className="p-4 max-w-3xl mx-auto w-full">
      <h1 className="font-semibold text-2xl mb-4">Lists</h1>
      <CategoryList />
    </section>
  );
}

function CategoryList() {
  const groceryList = useGroceryList();
  return (
    <ul className="space-y-4">
      <CategoryListItem href="/lists/groceries">
        <div className="flex items-center gap-2 text-lg">
          <ShoppingBasketIcon />
          Grocery List
          <div>{groceryList.items.length > 0 && groceryList.items.length}</div>
        </div>
      </CategoryListItem>
      <CategoryListItem href="/lists/routines">
        <div className="flex items-center gap-2 text-lg">
          <SproutIcon />
          Routines
        </div>
      </CategoryListItem>
      <CategoryListItem href="/lists/events">
        <div className="flex items-center gap-2 text-lg">
          <TicketIcon />
          Events
        </div>
      </CategoryListItem>
      <CategoryListItem href="/lists/chores">
        <div className="flex items-center gap-2 text-lg">
          <BrushCleaningIcon />
          Chores
        </div>
      </CategoryListItem>
    </ul>
  );
}

function CategoryListItem({
  href,
  children,
}: {
  href: string;
} & PropsWithChildren) {
  return (
    <li>
      <Link href={href} className="p-4 rounded-lg border block">
        {children}
      </Link>
    </li>
  );
}
