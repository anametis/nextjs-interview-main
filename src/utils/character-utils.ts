import type { Character } from "@/types/sw-types"
import type { FilterState } from "@/components/table/types"

export function filterCharacters(characters: Character[], filters: FilterState): Character[] {
  return characters.filter((character) => {
    // Multi-field search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableFields = [
        character.name,
        character.birth_year,
        character.gender,
        character.eye_color,
        character.hair_color,
        character.skin_color,
        character.homeworld,
      ]

      const matchesSearch = searchableFields.some((field) => field?.toLowerCase().includes(searchTerm))

      if (!matchesSearch) return false
    }

    // Gender filter
    if (filters.gender && character.gender !== filters.gender) {
      return false
    }

    // Height range filter
    if (filters.heightMin || filters.heightMax) {
      const height = Number.parseFloat(character.height)
      if (isNaN(height)) return false

      if (filters.heightMin && height < Number.parseFloat(filters.heightMin)) return false
      if (filters.heightMax && height > Number.parseFloat(filters.heightMax)) return false
    }

    // Mass range filter
    if (filters.massMin || filters.massMax) {
      const mass = Number.parseFloat(character.mass.replace(/,/g, ""))
      if (isNaN(mass)) return false

      if (filters.massMin && mass < Number.parseFloat(filters.massMin)) return false
      if (filters.massMax && mass > Number.parseFloat(filters.massMax)) return false
    }

    // Eye color filter
    if (filters.eyeColor && character.eye_color !== filters.eyeColor) {
      return false
    }

    // Hair color filter
    if (filters.hairColor && character.hair_color !== filters.hairColor) {
      return false
    }

    // Birth year filter
    if (filters.birthYear && !character.birth_year.toLowerCase().includes(filters.birthYear.toLowerCase())) {
      return false
    }

    return true
  })
}

export function paginateCharacters<T>(items: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  return items.slice(startIndex, endIndex)
}
