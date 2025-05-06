"use client";

import Link from "next/link";
import { Routine } from "./types";
import { useRoutineList } from "@/app/providers/routine-list";
import { PlusIcon } from "lucide-react";
import { AddRoutineDrawer } from "./components/add-routine-drawer";
import { BackButton } from "@/components/back-button";

export default function RoutinesPage() {
  const routineList = useRoutineList();
  return (
    <div className="h-full flex flex-col">
      <BackButton href="/lists" />
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
