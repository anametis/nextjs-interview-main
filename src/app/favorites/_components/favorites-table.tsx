"use client"
import Link from "next/link"
import { useState, useMemo } from "react"
import { useFavoritesStore } from "@/stores/favorites-store"
import { filterCharacters, paginateCharacters } from "@/utils/character-utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Character } from "@/types/sw-types"
import { CharacterFilters } from "@/components/table/filters"
import { columns } from "@/components/table/columns"
import { DataTable } from "@/components/table/data-table"
import { PaginationControls } from "@/components/table/pagination"
import { Heart, Trash2 } from "lucide-react"
import { CharacterDetailsModal } from "@/features/details.modal"
import { FilterState } from "@/components/table/types"

export function FavoritesTable() {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    gender: "",
    heightMin: "",
    heightMax: "",
    massMin: "",
    massMax: "",
    eyeColor: "",
    hairColor: "",
    birthYear: "",
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false)


  const handleViewDetails = (character: Character) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCharacter(null)
  }

  const handleToggleFavorite = (character: Character) => {
    if (isFavorite(character)) {
      removeFavorite(character)
    } else {
      addFavorite(character)
    }
  }

  const handleClearAllFavorites = () => {
    useFavoritesStore.setState({ favorites: [] });
  }

  const isFavorite = (character: Character) => {
    return favorites.some((fav) => fav.url === character.url)
  }

  const characterColumns = useMemo(() => {
    return columns({
      onViewDetails: handleViewDetails,
      onToggleFavorite: handleToggleFavorite,
      isFavorite,
    })
  }, [favorites])

  const filteredCharacters = useMemo(() => {
    return filterCharacters(favorites, filters)
  }, [favorites, filters])

  const paginatedCharacters = useMemo(() => {
    if (isInfiniteScroll) {
      return filteredCharacters.slice(0, currentPage * pageSize)
    }
    return paginateCharacters(filteredCharacters, currentPage, pageSize)
  }, [filteredCharacters, currentPage, pageSize, isInfiniteScroll])

  const totalPages = Math.ceil(filteredCharacters.length / pageSize)
  const hasMore = isInfiniteScroll && currentPage * pageSize < filteredCharacters.length

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const handleModeToggle = () => {
    setIsInfiniteScroll(!isInfiniteScroll)
    setCurrentPage(1)
  }

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (favorites.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="p-6 star-wars-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary">Favorite Characters</h2>
              <p className="text-muted-foreground mt-1">Your saved characters from the Star Wars universe</p>
            </div>
            <Badge variant="secondary" className="text-primary">
              0 favorites
            </Badge>
          </div>

          <div className="text-center py-12">
            <div className="star-wars-glow inline-block p-6 rounded-full mb-6">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring characters and add them to your favorites to see them here.
            </p>
            <Button asChild className="star-wars-border bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/">Browse Characters</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 star-wars-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">Favorite Characters</h2>
            <p className="text-muted-foreground mt-1">
              {filteredCharacters.length} of {favorites.length} favorite characters
              {filteredCharacters.length !== favorites.length && " (filtered)"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-primary">
              {paginatedCharacters.length} displayed
            </Badge>
            {favorites.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllFavorites}
                className="star-wars-border bg-transparent text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <CharacterFilters filters={filters} onFiltersChange={handleFiltersChange} characters={favorites} />
        </div>

        <DataTable
          columns={characterColumns}
          data={paginatedCharacters}
          searchKey="name"
          searchPlaceholder="This search is handled by filters above..."
        />
      </Card>

      {filteredCharacters.length > pageSize && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={filteredCharacters.length}
          pageSize={pageSize}
          isInfiniteScroll={isInfiniteScroll}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onModeToggle={handleModeToggle}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          loading={false}
        />
      )}

      <CharacterDetailsModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedCharacter ? isFavorite(selectedCharacter) : false}
      />
    </div>
  )
}
