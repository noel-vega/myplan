import { createContext, useContext, useState } from "react";
import { Routine, RoutineTask } from "../routines/types";

type RoutineListContext = {
  routines: Routine[];
  getRoutine: (routineId: string) => Routine | undefined;
  addRoutine: ({ name }: { name: string }) => void;
  removeRoutine: (routineId: string) => void;
  addRoutineTask: (args: {
    routineId: string;
    task: Omit<RoutineTask, "id">;
  }) => void;
  removeRoutineTask: (args: { routineId: string; taskId: string }) => void;
};
const RoutineListContext = createContext<RoutineListContext | null>(null);

export function RoutineListProvider(props: { children: React.ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: "1", name: "My Morning Routine", tasks: [] },
  ]);
  const addRoutine = (params: { name: string }) => {
    const newRoutine: Routine = {
      ...params,
      tasks: [],
      id: crypto.randomUUID(),
    };
    setRoutines((prev) => [...prev, newRoutine]);
  };

  const removeRoutine = (routineId: string) => {
    setRoutines((prev) => prev.filter((x) => x.id !== routineId));
  };

  const addRoutineTask = (args: {
    routineId: string;
    task: Omit<RoutineTask, "id">;
  }) => {
    setRoutines((prev) => {
      const routine = prev.find((x) => x.id === args.routineId);
      if (!routine) return prev;

      const task: RoutineTask = {
        ...args.task,
        id: crypto.randomUUID(),
      };
      const routineTasks = routine.tasks ?? [];
      const tasks = [...routineTasks, task];
      return prev.map((x) =>
        x.id === args.routineId ? { ...routine, tasks } : x
      );
    });
  };

  const removeRoutineTask = (args: { routineId: string; taskId: string }) => {
    setRoutines((prev) => {
      const routine = prev.find((x) => x.id === args.routineId);
      if (!routine) return prev;
      routine.tasks = routine.tasks.filter((x) => x.id !== args.taskId);
      return prev.map((x) => (x.id === args.routineId ? routine : x));
    });
  };

  const getRoutine = (routineId: string) => {
    return routines.find((x) => x.id === routineId);
  };

  return (
    <RoutineListContext.Provider
      value={{
        routines,
        getRoutine,
        addRoutine,
        removeRoutine,
        removeRoutineTask,
        addRoutineTask,
      }}
    >
      {props.children}
    </RoutineListContext.Provider>
  );
}

export function useRoutineList() {
  const context = useContext(RoutineListContext);
  if (!context)
    throw new Error("useRoutineList must be used within a RoutineListProvider");
  return context;
}
