"use client";
import { useRoutineList } from "@/app/providers/routine-list";
import { ArrowLeftIcon, PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AddRoutineTaskDrawer } from "./components/add-task-drawer";
import { RoutineTaskTable } from "./components/task-table";
import { RoutineSettingsDrawer } from "./routine-settings-drawer";

export default function RoutinePage() {
  const params = useParams();
  const { getRoutine } = useRoutineList();
  const routine = getRoutine(params.routineId as string);

  if (!routine) {
    return <div>Routine not found</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <header className="mb-4">
        <Link
          href="/lists/routines"
          className="flex items-center gap-1 py-2 mb-4"
        >
          <ArrowLeftIcon size={16} /> Back
        </Link>
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-sm">Routine</h1>
            <h2 className="text-xl font-semibold">{routine.name}</h2>
          </div>
          <RoutineSettingsDrawer routine={routine}>
            <button>
              <SettingsIcon className="text-gray-500" />
            </button>
          </RoutineSettingsDrawer>
        </div>
      </header>
      <section className="flex-1">
        <RoutineTaskTable items={routine.tasks} />
      </section>
      <AddRoutineTaskDrawer routineId={routine.id}>
        <button className="border rounded-lg p-4 mb-4 flex items-center w-full justify-center gap-2">
          <PlusIcon />
          Add Task
        </button>
      </AddRoutineTaskDrawer>
    </div>
  );
}
