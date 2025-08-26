"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, RotateCcw, Infinity } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generatePageNumbers } from "@/utils/pagination-utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  isInfiniteScroll: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onModeToggle: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  isInfiniteScroll,
  onPageChange,
  onPageSizeChange,
  onModeToggle,
  onLoadMore,
  hasMore = false,
  loading = false,
}: PaginationControlsProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);
  const pageNumbers = generatePageNumbers(totalPages, currentPage);

  return (
    <Card className="p-4 star-wars-border">
      <div className="flex flex-col items-start md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {startItem}-{endItem} of {totalCount} characters
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onModeToggle}
            className="bg-transparent"
          >
            {isInfiniteScroll ? (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                Switch to Pages
              </>
            ) : (
              <>
                <Infinity className="mr-2 h-4 w-4" />
                Infinite Scroll
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show:</span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="w-20 star-wars-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isInfiniteScroll ? (
          <div className="flex items-center gap-2">
            {/* {hasMore && (
              <Button
                onClick={onLoadMore}
                disabled={loading}
                className="star-wars-border bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            )} */}
            {!hasMore && totalCount > pageSize && (
              <Badge variant="secondary" className="text-primary">
                All characters loaded
              </Badge>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="star-wars-border"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {pageNumbers.map((page, index) => (
                <div key={index}>
                  {typeof page === "number" ? (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "star-wars-border"
                      }
                    >
                      {page}
                    </Button>
                  ) : (
                    <span className="px-3 py-2 text-sm text-muted-foreground">
                      {page}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="star-wars-border"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
