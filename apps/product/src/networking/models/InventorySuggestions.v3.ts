export interface InventorySuggestionsResponse {
  data: InventorySuggestions;
}

export interface InventorySuggestions {
  BodyType: string[];
  Make: string[];
  Model: string[];
}
