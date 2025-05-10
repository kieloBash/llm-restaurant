export interface LLMOutput {
  action: LLMActions;
  parameters: {
    query: string;
    near?: string;
    min_price?: number;
    open_now?: boolean;
  };
}

export type LLMActions = "restaurant_search";
