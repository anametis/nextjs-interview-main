"use client";
import { useState, useMemo } from "react";
import { Character, People } from "@/types/sw-types";
import { useFavoritesStore } from "@/stores/favorites-store";
import { filterCharacters, paginateCharacters } from "@/utils/character-utils";
import { DataTable } from "@/components/table/data-table";
import { CharacterFilters } from "@/components/table/filters";
import { columns } from "@/components/table/columns";
import { PaginationControls } from "@/components/table/pagination";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CharacterDetailsModal } from "@/features/details.modal";
import { FilterState } from "@/components/table/types";

export function PeopleTable({ data }: { data: People }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const handleViewDetails = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCharacter(null);
  };
  const isFavorite = (character: Character) => {
    return favorites.some((fav) => fav.url === character.url);
  };

  const handleToggleFavorite = (character: Character) => {
    if (isFavorite(character)) {
      removeFavorite(character);
    } else {
      addFavorite(character);
    }
  };

  const characterColumns = useMemo(() => {
    return columns({
      onViewDetails: handleViewDetails,
      onToggleFavorite: handleToggleFavorite,
      isFavorite,
    });
  }, [favorites]);

  const filteredCharacters = useMemo(() => {
    return filterCharacters(data, filters);
  }, [data, filters]);

  const displayedCharacters = useMemo(() => {
    if (isInfiniteScroll) {
      // For infinite scroll, show all characters up to current page
      return filteredCharacters.slice(0, currentPage * pageSize);
    }
    return paginateCharacters(filteredCharacters, currentPage, pageSize);
  }, [filteredCharacters, currentPage, pageSize, isInfiniteScroll]);

  const hasNextPage = useMemo(() => {
    if (isInfiniteScroll) {
      // Check if there are more characters to load
      return currentPage * pageSize < filteredCharacters.length;
    }
    return currentPage < Math.ceil(filteredCharacters.length / pageSize);
  }, [isInfiniteScroll, currentPage, pageSize, filteredCharacters.length]);

  const totalPages = Math.ceil(filteredCharacters.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleModeToggle = () => {
    setIsInfiniteScroll(!isInfiniteScroll);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    if (isInfiniteScroll && hasNextPage && !isFetchingNextPage) {
      setIsFetchingNextPage(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFetchingNextPage(false);
      }, 200);
    }
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-3">
      <Card className="p-6 star-wars-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary">Characters</h2>
            <p className="text-muted-foreground mt-1">
              {filteredCharacters.length} of {data.length} characters
              {filteredCharacters.length !== data.length && " (filtered)"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-primary">
              {displayedCharacters.length} displayed
            </Badge>
            <Badge variant="outline" className="text-primary">
              {favorites.length} favorites
            </Badge>
          </div>
        </div>

        <CharacterFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          characters={data}
        />

        <DataTable
          columns={characterColumns}
          data={displayedCharacters}
          searchKey="name"
          searchPlaceholder="This search is handled by filters above..."
          isInfiniteScroll={isInfiniteScroll}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={handleLoadMore}
        />
      </Card>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={filteredCharacters.length}
        pageSize={pageSize}
        isInfiniteScroll={isInfiniteScroll}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onModeToggle={handleModeToggle}
        hasMore={hasNextPage}
      />

      <CharacterDetailsModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedCharacter ? isFavorite(selectedCharacter) : false}
      />
    </div>
  );
}
