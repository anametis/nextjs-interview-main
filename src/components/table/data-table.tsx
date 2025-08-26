"use client";
import { useRef, useState, useEffect } from "react";
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  isInfiniteScroll?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  estimateRowSize?: number;
  virtualizedHeight?: number;
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isInfiniteScroll = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
  estimateRowSize = 60, // Default row height
  virtualizedHeight = 600, // Default container height
  pageSize = 20,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const tableRows = table.getRowModel().rows;
  const parentRef = useRef<HTMLDivElement>(null);
  
  // Setup virtualizer for infinite scroll
  const rowVirtualizer = useVirtualizer({
    count: isInfiniteScroll && hasNextPage ? tableRows.length + 1 : tableRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateRowSize,
    overscan: 5,
  });

  // Trigger fetchNextPage when scrolling near the end
  useEffect(() => {
    if (!isInfiniteScroll || !fetchNextPage) return;

    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();
    
    if (!lastItem) return;

    if (
      lastItem.index >= tableRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    isInfiniteScroll,
    hasNextPage,
    fetchNextPage,
    tableRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
    pageSize,
  ]);

  if (isInfiniteScroll) {
    return (
      <div className="rounded-md w-full border star-wars-border">
        <div className="border-b border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-border hover:bg-muted/50"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-primary font-bold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
        </div>
        <div
          ref={parentRef}
          style={{
            height: `${virtualizedHeight}px`,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > tableRows.length - 1;
              const row = tableRows[virtualRow.index];

              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {isLoaderRow ? (
                    // Loader row
                    <div className="flex items-center justify-center h-full border-b border-border">
                      {hasNextPage ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                          Loading more...
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No more characters to load</span>
                      )}
                    </div>
                  ) : (
                    // Data row
                    <div className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer flex">
                      {row.getVisibleCells().map((cell) => (
                        <div
                          key={cell.id}
                          className="px-4 py-2 flex items-center"
                          style={{
                            width: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : 'auto',
                            flex: cell.column.getSize() === 150 ? 1 : undefined,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {tableRows.length === 0 && (
          <div className="h-24 flex items-center justify-center text-center">
            No results.
          </div>
        )}
      </div>
    );
  }

  // Non-virtualized version (original implementation)
  return (
    <div className="rounded-md w-full border star-wars-border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-border hover:bg-muted/50"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-primary font-bold"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {tableRows?.length ? (
            tableRows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}