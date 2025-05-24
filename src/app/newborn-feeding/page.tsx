import { AddFeedingDrawer } from "./components/add-feeding-drawer";
import { getNewbornFeedingsByDate } from "./actions";
import { FeedingsTable } from "./components/feedings-table";
import { format } from "date-fns";

export default async function Page() {
  const date = new Date();
  const feedings = await getNewbornFeedingsByDate(date);

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto p-4">
      <section className="flex-1">
        <div className="flex items-end justify-between text-2xl font-semibold mb-4">
          <p className="text-3xl">Feeding</p>
          <p>{format(date.toLocaleDateString(), "MM-dd-yyyy")}</p>
        </div>
        <FeedingsTable data={feedings} />
      </section>

      <footer>
        <AddFeedingDrawer />
      </footer>
    </div>
  );
}
