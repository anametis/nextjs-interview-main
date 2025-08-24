"use client";
import { Character } from "@/types/sw-types";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PeopleTableProps {
  data: Character[];
}

interface SortConfig {
  key: keyof Character;
  direction: "asc" | "desc";
}

export function PeopleTable({ data }: PeopleTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(
      (character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.homeworld.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (sortConfig.direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }

      return 0;
    });

    return sorted;
  }, [data, searchTerm, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (key: keyof Character) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const formatValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(", ") : "None";
    }
    return value || "Unknown";
  };

  const getSortIcon = (key: keyof Character) => {
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-full space-y-4">
      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search by name, homeworld, or gender..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedData.length} of {data.length} characters
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {[
                { key: "name", label: "Name" },
                { key: "height", label: "Height" },
                { key: "mass", label: "Mass" },
                { key: "hair_color", label: "Hair Color" },
                { key: "eye_color", label: "Eye Color" },
                { key: "birth_year", label: "Birth Year" },
                { key: "gender", label: "Gender" },
                { key: "homeworld", label: "Homeworld" },
                { key: "films", label: "Films" },
                { key: "species", label: "Species" },
              ].map(({ key, label }) => (
                <TableHead
                  key={key}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key as keyof Character)}
                    className="h-auto p-0 font-semibold text-left hover:bg-transparent"
                  >
                    {label} {getSortIcon(key as keyof Character)}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((character, index) => (
                <TableRow
                  key={character.url}
                  className={cn(
                    "hover:bg-gray-50 transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-gray-25"
                  )}
                >
                  <TableCell className="font-medium">
                    {character.name}
                  </TableCell>
                  <TableCell>
                    {character.height === "unknown"
                      ? "Unknown"
                      : `${character.height}cm`}
                  </TableCell>
                  <TableCell>
                    {character.mass === "unknown"
                      ? "Unknown"
                      : `${character.mass}kg`}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {character.hair_color === "n/a"
                        ? "N/A"
                        : character.hair_color}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {character.eye_color === "n/a"
                        ? "N/A"
                        : character.eye_color}
                    </Badge>
                  </TableCell>
                  <TableCell>{character.birth_year}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        character.gender === "male" ? "default" : "secondary"
                      }
                      className="capitalize"
                    >
                      {character.gender === "n/a" ? "N/A" : character.gender}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className="max-w-32 truncate"
                    title={character.homeworld}
                  >
                    {character.homeworld}
                  </TableCell>
                  <TableCell className="max-w-32">
                    <div className="flex flex-wrap gap-1">
                      {character.films.length > 0 ? (
                        character.films.slice(0, 2).map((film, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            Film {i + 1}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                      {character.films.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{character.films.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-32">
                    <div className="flex flex-wrap gap-1">
                      {character.species.length > 0 ? (
                        character.species.slice(0, 2).map((species, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            Species {i + 1}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                      {character.species.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{character.species.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-gray-500"
                >
                  {searchTerm
                    ? "No characters found matching your search."
                    : "No characters available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
