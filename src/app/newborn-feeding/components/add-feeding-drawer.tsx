"use client";
import {
  insertNewbornFeedingSchema,
  InsertNewbornFeedingType,
} from "@/db/schema/newborn-feeding";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  getUseNewbornFeedingsQueryOptions,
  useCreateNewbornFeedingMutation,
} from "../hooks";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer } from "vaul";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { LoadingSpinner } from "@/components/loading-spinner";
import { cn } from "@/lib/cn";
import { getQueryClient } from "@/app/providers/react-query";

export function AddFeedingDrawer() {
  const [open, setOpen] = useState(false);
  const createNewbornFeedingMutation = useCreateNewbornFeedingMutation();
  const form = useForm<InsertNewbornFeedingType>({
    resolver: zodResolver(insertNewbornFeedingSchema),
    defaultValues: {
      datetime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      type: "breast",
      unit: "minutes",
      amount: 20,
    },
  });

  const handleSubmit = (data: InsertNewbornFeedingType) => {
    createNewbornFeedingMutation.mutate(data, {
      onSuccess: ({ datetime }) => {
        setOpen(false);
        getQueryClient().invalidateQueries(
          getUseNewbornFeedingsQueryOptions(
            format(new Date(datetime), "yyyy-MM-dd")
          )
        );
      },
    });
  };
  useEffect(() => {
    form.reset();
  }, [open]);
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="border w-full rounded-lg p-2 cursor-pointer flex items-center gap-2 justify-center text-xl">
        <PlusIcon size={16} />
        Feed
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={
            "fixed bottom-0 left-0 right-0 bg-white p-8 rounded-t-lg outline-none"
          }
        >
          <form
            onSubmit={form.handleSubmit((data) => {
              handleSubmit(data);
            })}
            className={cn("max-w-3xl mx-auto space-y-8", {
              "opacity-50": createNewbornFeedingMutation.isPending,
            })}
          >
            <Drawer.Title className="text-lg font-bold flex items-center gap-2">
              Feeding{" "}
              <LoadingSpinner
                loading={createNewbornFeedingMutation.isPending}
              />
            </Drawer.Title>
            <div className="flex flex-col justify-between gap-2">
              <div className="flex flex-col gap-1">
                <label>Date</label>
                <input
                  type="datetime-local"
                  {...form.register("datetime")}
                  className="p-2 border rounded"
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
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={
                createNewbornFeedingMutation.isPending ||
                form.formState.isSubmitting ||
                !open
              }
              className="border w-full p-4 rounded-lg text-xl cursor-pointer"
            >
              Submit
            </button>
          </form>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
