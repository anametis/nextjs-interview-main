"use client";
import {
  X,
  User,
  Globe,
  Film,
  Zap,
  Car,
  Rocket,
  Heart,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Character } from "@/types/sw-types";

interface CharacterDetailsModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (character: Character) => void;
  isFavorite?: boolean;
}

export function CharacterDetailsModal({
  character,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorite = false,
}: CharacterDetailsModalProps) {
  const getPhysicalStats = () => {
    if (!character) return [];

    return [
      {
        label: "Height",
        value:
          character.height === "unknown" ? "Unknown" : `${character.height} cm`,
      },
      {
        label: "Mass",
        value:
          character.mass === "unknown" ? "Unknown" : `${character.mass} kg`,
      },
      { label: "Hair Color", value: character.hair_color },
      { label: "Skin Color", value: character.skin_color },
      { label: "Eye Color", value: character.eye_color },
    ];
  };

  if (!character) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 star-wars-border bg-card">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold text-primary mb-2">
                {character.name}
              </DialogTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="secondary" className="capitalize">
                  {character.gender}
                </Badge>
                <span>•</span>
                <span>Born {character.birth_year}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {onToggleFavorite && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleFavorite(character)}
                  className={`star-wars-border ${
                    isFavorite ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      isFavorite ? "fill-current" : ""
                    }`}
                  />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          <div className="space-y-6">
            {/* Physical Characteristics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <User className="h-5 w-5" />
                  Physical Characteristics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getPhysicalStats().map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-foreground capitalize">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Homeworld */}
            {character?.homeworld && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Globe className="h-5 w-5" />
                    Homeworld
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground">
                      {character.homeworld}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Films */}
            {character?.films && character.films.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Film className="h-5 w-5" />
                    Films ({character.films.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {character.films.map((film, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                      
                      >
                        {film}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Species */}
            {character?.species && character.species.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Zap className="h-5 w-5" />
                    Species
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {character.species.map((species, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="capitalize"
                      >
                        {species}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vehicles */}
            {character?.vehicles && character.vehicles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Car className="h-5 w-5" />
                    Vehicles ({character.vehicles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {character.vehicles.map((vehicle, index) => (
                      <div
                        key={index}
                        className="p-2 rounded border border-border bg-muted/20"
                      >
                        <span className="text-foreground">{vehicle}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Starships */}
            {character?.starships && character.starships.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Rocket className="h-5 w-5" />
                    Starships ({character.starships.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {character.starships.map((starship, index) => (
                      <div
                        key={index}
                        className="p-2 rounded border border-border bg-muted/20"
                      >
                        <span className="text-foreground">{starship}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="text-foreground">
                      {new Date(character?.created || "").toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="text-foreground">
                      {new Date(character?.edited || "").toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
