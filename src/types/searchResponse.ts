export interface SearchResponse {
  resultsCount: number;
  results: {
    url: string;
    title: string;
    description: string;
  }[];
}
