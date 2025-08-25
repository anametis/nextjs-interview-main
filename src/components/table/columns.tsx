"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Character } from "@/types/sw-types"

interface CharacterColumnsProps {
  onViewDetails?: (character: Character) => void
  onToggleFavorite?: (character: Character) => void
  isFavorite?: (character: Character) => boolean
}

export function columns({
  onViewDetails,
  onToggleFavorite,
  isFavorite,
}: CharacterColumnsProps = {}): ColumnDef<Character>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 text-primary font-bold"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div
          className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={() => onViewDetails?.(row.original)}
        >
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "height",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 text-primary font-bold"
          >
            Height
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const height = row.getValue("height") as string
        return <div className="text-muted-foreground">{height === "unknown" ? "Unknown" : `${height} cm`}</div>
      },
    },
    {
      accessorKey: "mass",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-muted/50 text-primary font-bold"
          >
            Mass
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const mass = row.getValue("mass") as string
        return <div className="text-muted-foreground">{mass === "unknown" ? "Unknown" : `${mass} kg`}</div>
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        const gender = row.getValue("gender") as string
        return (
          <Badge variant="secondary" className="capitalize">
            {gender}
          </Badge>
        )
      },
    },
    {
      accessorKey: "birth_year",
      header: "Birth Year",
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("birth_year")}</div>,
    },
    {
      accessorKey: "eye_color",
      header: "Eye Color",
      cell: ({ row }) => {
        const eyeColor = row.getValue("eye_color") as string
        return (
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full border border-border"
              style={{
                backgroundColor:
                  eyeColor === "blue"
                    ? "#3b82f6"
                    : eyeColor === "brown"
                      ? "#92400e"
                      : eyeColor === "green"
                        ? "#059669"
                        : eyeColor === "yellow"
                          ? "#eab308"
                          : eyeColor === "red"
                            ? "#dc2626"
                            : eyeColor === "black"
                              ? "#000000"
                              : eyeColor === "hazel"
                                ? "#a16207"
                                : "#6b7280",
              }}
            />
            <span className="text-muted-foreground capitalize">{eyeColor}</span>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const character = row.original
        const isCharacterFavorite = isFavorite?.(character) || false

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(character.name)}>
                Copy character name
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewDetails?.(character)}>
                <Eye className="mr-2 h-4 w-4" />
                View character details
              </DropdownMenuItem>
              {onToggleFavorite && (
                <DropdownMenuItem onClick={() => onToggleFavorite(character)}>
                  <Heart className={`mr-2 h-4 w-4 ${isCharacterFavorite ? "fill-current text-primary" : ""}`} />
                  {isCharacterFavorite ? "Remove from favorites" : "Add to favorites"}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
