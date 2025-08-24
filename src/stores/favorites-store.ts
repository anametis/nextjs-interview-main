import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Character } from "@/types/sw-types";

type FavoritesStore = {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (character: Character) => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (character) =>
        set((state) => ({ favorites: [...state.favorites, character] })),
      removeFavorite: (character) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c.name !== character.name),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);
