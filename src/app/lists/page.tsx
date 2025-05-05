import { BrushCleaningIcon, ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Lists() {
  return (
    <section className="p-4">
      <h1 className="font-semibold text-2xl mb-4">Lists</h1>
      <CategoryList />
    </section>
  );
}

function CategoryList() {
  return (
    <ul className="space-y-4">
      <CategoryListItem href="/lists/groceries">
        <div className="flex items-center gap-2 text-lg">
          <ShoppingBasketIcon />
          Grocery List
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
