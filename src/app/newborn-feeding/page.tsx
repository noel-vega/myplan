import { AddFeedingDrawer } from "./components/add-feeding-drawer";
import { getNewbornFeedingsByDate } from "./actions";
import { FeedingsTable } from "./components/feedings-table";

export default async function Page() {
  const feedings = await getNewbornFeedingsByDate(new Date());

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto p-4">
      <section className="flex-1">
        <div className="flex items-end justify-between text-2xl font-semibold mb-4">
          <p className="text-3xl">Feeding</p>
        </div>
        <FeedingsTable data={feedings} />
      </section>

      <footer>
        <AddFeedingDrawer />
      </footer>
    </div>
  );
}
