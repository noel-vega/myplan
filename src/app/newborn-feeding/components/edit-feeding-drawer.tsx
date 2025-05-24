"use client";
import { PropsWithChildren, useState } from "react";
import {
  getUseNewbornFeedingsQueryOptions,
  useDeleteNewbornFeedingMutation,
} from "../hooks";
import { Drawer } from "vaul";
import { getQueryClient } from "@/app/providers/react-query";

export function EditFeedingDrawer({
  id,
  children,
}: { id: number } & PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const deleteNewbornFeedingMutation = useDeleteNewbornFeedingMutation();

  const handleDelete = () => {
    deleteNewbornFeedingMutation.mutate(id, {
      onSuccess: ({ datetime }) => {
        setOpen(false);
        getQueryClient().invalidateQueries(
          getUseNewbornFeedingsQueryOptions(new Date(datetime))
        );
      },
    });
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 left-0 right-0 bg-white p-8 rounded-t-lg outline-none"
          }
        >
          <Drawer.Title />
          {/* <form
            onSubmit={form.handleSubmit((data) => {

              handleSubmit(data);
            })}
            className="max-w-3xl mx-auto space-y-8"
          >
            <Drawer.Title className="py-0" />
            <div className="flex justify-between text-xl">
              <div className="flex flex-col gap-1">
                <label>Time</label>
                <input
                  type="time"
                  {...form.register("date")}
                  className="w-fit p-2 border rounded"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Type</label>
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={(type: "breast" | "formula") =>
                        field.onChange(type)
                      }
                    >
                      <Select.Trigger className="flex justify-between items-center gap-2 border rounded p-2">
                        <Select.Value />
                        <Select.Icon>
                          <ChevronDownIcon size={16} />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content
                          style={{ width: "var(--radix-select-trigger-width)" }}
                          position="popper"
                          className="bg-white p-2 w-full border rounded mt-2"
                        >
                          <Select.Viewport>
                            <Select.Item
                              value="breast"
                              className="relative py-1"
                            >
                              <Select.ItemText>Breast</Select.ItemText>
                            </Select.Item>

                            <Select.Item
                              value="formula"
                              className="relative py-1"
                            >
                              <Select.ItemText>Formula</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Unit</label>
                <Controller
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <Select.Root
                      value={field.value}
                      onValueChange={(type: "minutes" | "ounces") =>
                        field.onChange(type)
                      }
                    >
                      <Select.Trigger className="flex justify-between items-center gap-2 border rounded p-2">
                        <Select.Value />
                        <Select.Icon>
                          <ChevronDownIcon size={16} />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content
                          style={{ width: "var(--radix-select-trigger-width)" }}
                          position="popper"
                          className="bg-white p-2 w-full border rounded mt-2"
                        >
                          <Select.Viewport>
                            <Select.Item
                              value="minutes"
                              className="relative py-1"
                            >
                              <Select.ItemText>Minutes</Select.ItemText>
                            </Select.Item>

                            <Select.Item
                              value="ounces"
                              className="relative py-1"
                            >
                              <Select.ItemText>Ounces</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>
                  {form.watch("type") === "breast" ? "Minutes" : "Ounces"}
                </label>
                <input
                  type="number"
                  {...form.register("amount")}
                  className="w-20 p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="border w-full p-4 rounded-lg text-xl cursor-pointer"
            >
              Submit
            </button>
          </form> */}
          <button
            type="submit"
            className="border w-full p-4 rounded-lg text-xl cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
