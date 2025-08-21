import * as React from "react";

interface InfiniteScrollOptions {
  threshold?: number; // Distance from bottom to trigger load
  hasMore: boolean;
  isLoading: boolean;
}

export const useInfiniteScroll = (
  loadMore: () => void,
  options: InfiniteScrollOptions
) => {
  const { threshold = 200, hasMore, isLoading } = options;
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      if (hasMore && !isLoading) {
        await loadMore();
      }
      setIsFetching(false);
    };

    fetchData();
  }, [isFetching, hasMore, isLoading, loadMore]);

  const scrollHandler = React.useCallback(
    (scrollElement: HTMLElement) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;

      if (
        scrollHeight - scrollTop - clientHeight < threshold &&
        hasMore &&
        !isLoading &&
        !isFetching
      ) {
        setIsFetching(true);
      }
    },
    [threshold, hasMore, isLoading, isFetching]
  );

  return {
    isFetching,
    scrollHandler,
  };
};
