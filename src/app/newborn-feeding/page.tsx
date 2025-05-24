"use client";
import { AddFeedingDrawer } from "./components/add-feeding-drawer";
import { FeedingsTable } from "./components/feedings-table";
import { format } from "date-fns";
import { useNewbornFeedings } from "./hooks";
import { useEffect, useState } from "react";

export default function Page() {
  const [browser, setBrowser] = useState(false);
  const [date, setDate] = useState(new Date());
  const feedings = useNewbornFeedings(date);

  useEffect(() => {
    setBrowser(true);
    setDate(new Date());
  }, []);

  if (!browser) {
    return null;
  }

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto p-4">
      <section className="flex-1">
        <div className="flex items-end justify-between text-2xl font-semibold mb-4">
          <p className="text-3xl">Feeding</p>
          <p>{format(date, "MM-dd-yyyy")}</p>
        </div>
        <FeedingsTable data={feedings.data ?? []} />
      </section>

      <footer>
        <AddFeedingDrawer />
      </footer>
    </div>
  );
}
