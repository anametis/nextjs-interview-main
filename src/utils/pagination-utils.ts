export const generatePageNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    // If 7 or fewer pages, show all page numbers
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage <= 4) {
      // Near the beginning: show 1, 2, 3, 4, 5, ..., last
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Near the end: show 1, ..., last-3, last-2, last-1, last
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages - 1; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    } else {
      // In the middle: show 1, ..., current-1, current, current+1, ..., last
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
};
