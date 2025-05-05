import { PlusIcon, Trash2Icon } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Drawer } from "vaul";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Routine, RoutineSchema } from "../types";
import { useRoutineList } from "@/app/providers/routine-list";
import { useRouter } from "next/navigation";

export function RoutineSettingsDrawer({
  children,
  routine,
}: { routine: Routine } & PropsWithChildren) {
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const routineList = useRoutineList();

  const handleTrashClick = () => {
    routineList.removeRoutine(routine.id);
    navigate.push("/lists/routines");
    setOpen(false);
  };
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      {!open ? <Drawer.Trigger asChild>{children}</Drawer.Trigger> : null}

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 left-0 right-0 bg-white px-4 py-8 rounded-t-lg outline-none"
          }
        >
          <div className="max-w-lg mx-auto w-full">
            <Drawer.Title className="mb-4 font-semibold text-xl flex justify-between">
              Routine settings
              <button onClick={handleTrashClick}>
                <Trash2Icon className="text-red-400" />
              </button>
            </Drawer.Title>
            <RoutineSettings
              routine={routine}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function RoutineSettings({
  onSuccess,
  routine,
}: {
  onSuccess?: () => void;
  routine: Routine;
}) {
  const routineList = useRoutineList();
  const form = useForm({
    resolver: zodResolver(RoutineSchema),
    defaultValues: routine,
  });
  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        console.log(data, "data");
        routineList.addRoutine({
          name: data.name,
        });
        onSuccess?.();
        form.reset();
      })}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="item-name">Name</label>
        <input
          {...form.register("name")}
          type="text"
          id="item-name"
          className="border rounded-lg p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="border rounded-lg p-2 w-full flex justify-center items-center gap-4 text-lg cursor-pointer"
      >
        <PlusIcon size={16} />
        Update Routine
      </button>
    </form>
  );
}
