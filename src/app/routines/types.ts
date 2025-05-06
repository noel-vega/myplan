import { z } from "zod";

export const RoutineTaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  competed: z.boolean().default(false),
});
export type RoutineTask = z.infer<typeof RoutineTaskSchema>;

export const AddRoutineTaskSchema = RoutineTaskSchema.omit({ id: true });
export type AddRoutineTaskParams = z.infer<typeof AddRoutineTaskSchema>;

export const RoutineSchema = z.object({
  id: z.string(),
  name: z.string(),
  tasks: RoutineTaskSchema.array(),
});

export const AddRoutineSchema = RoutineSchema.omit({ id: true });
export type AddRoutineParams = z.infer<typeof AddRoutineSchema>;

export type Routine = z.infer<typeof RoutineSchema>;
