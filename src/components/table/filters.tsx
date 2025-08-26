"use client"
import { useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card } from "@/components/ui/card"
import { Character } from "@/types/sw-types"
import { FilterState } from "./types"

interface CharacterFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  characters: Character[]
}

export function CharacterFilters({ filters, onFiltersChange, characters }: CharacterFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
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
  }

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => key !== "search" && value !== "").length
  }

  const uniqueGenders = [...new Set(characters.map((c) => c.gender).filter(Boolean))]
  const uniqueEyeColors = [...new Set(characters.map((c) => c.eye_color).filter(Boolean))]
  const uniqueHairColors = [...new Set(characters.map((c) => c.hair_color).filter(Boolean))]

  const activeFilterCount = getActiveFilterCount()

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="flex-1 min-w-0">
        <Input
          placeholder="Search by name, birth year, or any field..."
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="star-wars-border"
        />
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="star-wars-border bg-transparent relative">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <Card className="border-0 shadow-lg py-0">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-primary">Advanced Filters</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* ===== Gender Filter ===== */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Gender</Label>
                <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
                  <SelectTrigger className="star-wars-border">
                    <SelectValue placeholder="Any gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any gender</SelectItem>
                    {uniqueGenders.map((gender) => (
                      <SelectItem key={gender} value={gender} className="capitalize">
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ===== Height Range ===== */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Height Range (cm)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    value={filters.heightMin}
                    onChange={(e) => updateFilter("heightMin", e.target.value)}
                    className="star-wars-border"
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    value={filters.heightMax}
                    onChange={(e) => updateFilter("heightMax", e.target.value)}
                    className="star-wars-border"
                    type="number"
                  />
                </div>
              </div>

              {/* ===== Mass Range ===== */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Mass Range (kg)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    value={filters.massMin}
                    onChange={(e) => updateFilter("massMin", e.target.value)}
                    className="star-wars-border"
                    type="number"
                  />
                  <Input
                    placeholder="Max"
                    value={filters.massMax}
                    onChange={(e) => updateFilter("massMax", e.target.value)}
                    className="star-wars-border"
                    type="number"
                  />
                </div>
              </div>

              {/* ===== Eye Color Filter ===== */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Eye Color</Label>
                <Select value={filters.eyeColor} onValueChange={(value) => updateFilter("eyeColor", value)}>
                  <SelectTrigger className="star-wars-border">
                    <SelectValue placeholder="Any eye color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any eye color</SelectItem>
                    {uniqueEyeColors.map((color) => (
                      <SelectItem key={color} value={color} className="capitalize">
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ===== Hair Color Filter ===== */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Hair Color</Label>
                <Select value={filters.hairColor} onValueChange={(value) => updateFilter("hairColor", value)}>
                  <SelectTrigger className="star-wars-border">
                    <SelectValue placeholder="Any hair color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any hair color</SelectItem>
                    {uniqueHairColors.map((color) => (
                      <SelectItem key={color} value={color} className="capitalize">
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ===== Birth Year Filter ===== */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Birth Year</Label>
                <Input
                  placeholder="e.g., 19BBY, 41.9BBY"
                  value={filters.birthYear}
                  onChange={(e) => updateFilter("birthYear", e.target.value)}
                  className="star-wars-border"
                />
              </div>
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}
