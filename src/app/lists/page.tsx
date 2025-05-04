import Link from "next/link";

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
      <CategoryListItem name="Groceries" href="/lists/groceries" />
      <CategoryListItem name="Chores" href="/lists/chores" />
    </ul>
  );
}

function CategoryListItem({ name, href }: { name: string; href: string }) {
  return (
    <li>
      <Link href={href} className="p-4 rounded-lg border block">
        {name}
      </Link>
    </li>
  );
}
