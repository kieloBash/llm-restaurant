import { z } from "zod";

export const LLMActionsEnum = z.enum(["restaurant_search"], {
  required_error: "Action is required",
  invalid_type_error: "Invalid action provided",
});
export type LLMActions = z.infer<typeof LLMActionsEnum>;

export const LLMParametersSchema = z.object(
  {
    query: z
      .string({
        required_error: "Query is required",
        invalid_type_error: "Query must be a string",
      })
      .nonempty("Query cannot be empty"),
    near: z
      .string({
        invalid_type_error: "Near must be a string",
      })
      .optional(),
    min_price: z
      .number({
        invalid_type_error: "Min price must be a number",
      })
      .optional(),
    min_rating: z
      .number({
        invalid_type_error: "Min rating must be a number",
      })
      .optional(),
    open_now: z
      .boolean({
        invalid_type_error: "Open now must be a boolean",
      })
      .optional(),
  },
  {
    invalid_type_error: "Parameters must be a valid object",
  }
);

export const LLMOutputSchema = z.object({
  action: LLMActionsEnum,
  parameters: LLMParametersSchema,
});
