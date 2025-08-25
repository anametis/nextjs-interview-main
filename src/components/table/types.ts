export type SortDirection = "asc" | "desc";

export type SortConfig<T> = {
  key: keyof T;
  direction: SortDirection;
} | null;

export interface FilterState {
  search: string
  gender: string
  heightMin: string
  heightMax: string
  massMin: string
  massMax: string
  eyeColor: string
  hairColor: string
  birthYear: string
}