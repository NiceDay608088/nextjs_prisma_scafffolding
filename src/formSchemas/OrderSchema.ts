import { z } from "zod";

export const createOrderSchema = z.object({
  name: z.string().nonempty("Order name is required."),
  categories: z.array(z.string()).optional(),
  amount: z.number().min(0.1),
  labels: z.array(z.object({})).optional(),
});

export type createOrderFormType = z.infer<typeof createOrderSchema>;
