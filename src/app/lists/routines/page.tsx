"use client";

import Link from "next/link";
import { Routine } from "./types";
import { useRoutineList } from "@/app/providers/routine-list";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { AddRoutineDrawer } from "./components/add-routine-drawer";

export default function RoutinesPage() {
  const routineList = useRoutineList();
  return (
    <div className="px-4 h-full flex flex-col pb-4 max-w-3xl mx-auto w-full">
      <Link href="/lists" className="flex items-center gap-1 py-2 mb-4">
        <ArrowLeftIcon size={16} /> Back
      </Link>
      <h1 className="text-2xl font-semibold mb-4">Routines</h1>
      <div className="flex-1">
        <RoutineList routines={routineList.routines} />
      </div>
      <AddRoutineDrawer>
        <button className="border rounded-lg p-4 w-full flex items-center justify-center gap-2">
          <PlusIcon />
          Add Routine
        </button>
      </AddRoutineDrawer>
    </div>
  );
}

function RoutineList({ routines }: { routines: Routine[] }) {
  return (
    <ul className="space-y-4">
      {routines.map((routine) => (
        <li key={routine.id}>
          <Link
            href={`/lists/routines/${routine.id}`}
            className="border rounded-lg p-4 block"
          >
            {routine.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
