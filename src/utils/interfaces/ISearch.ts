export interface ISearch<T> {
  search: (query?: string) => Promise<T[]>;
  searchDate: (query?: Date) => Promise<T[]>;
}
