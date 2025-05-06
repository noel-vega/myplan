"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";
import {
  BrushCleaningIcon,
  ShoppingBasketIcon,
  SproutIcon,
  TicketIcon,
} from "lucide-react";
import { useGroceryList } from "./groceries/hooks/useGroceryList";

export default function CategoryListPage() {
  useGroceryList({ id: 1 });
  return (
    <section className="p-4 max-w-3xl mx-auto w-full">
      <CategoryList />
    </section>
  );
}

function CategoryList() {
  return (
    <ul className="space-y-4">
      <CategoryListItem href="/groceries/1">
        <div className="flex items-center gap-2 text-lg">
          <ShoppingBasketIcon />
          Grocery List
          {/* <div>{groceryList.data.items.length > 0 && groceryList.items.length}</div> */}
        </div>
      </CategoryListItem>
      <CategoryListItem href="/routines">
        <div className="flex items-center gap-2 text-lg">
          <SproutIcon />
          Routines
        </div>
      </CategoryListItem>
      <CategoryListItem href="/events">
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
