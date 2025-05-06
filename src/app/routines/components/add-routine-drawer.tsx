import { PlusIcon } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Drawer } from "vaul";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddRoutineSchema } from "../types";
import { useRoutineList } from "@/app/providers/routine-list";

export function AddRoutineDrawer({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
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
            <Drawer.Title className="mb-4 font-semibold text-xl">
              Add new routine
            </Drawer.Title>
            <AddRoutineForm onSuccess={() => setOpen(false)} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function AddRoutineForm({ onSuccess }: { onSuccess?: () => void }) {
  const routineList = useRoutineList();
  const form = useForm({
    resolver: zodResolver(AddRoutineSchema),
    defaultValues: {
      name: "",
      tasks: [],
    },
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
        Add Routine
      </button>
    </form>
  );
}
