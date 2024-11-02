import { createContext, useCallback, useMemo, useState } from "react";
import { useJobItems } from "../utils/hooks";
import { JobItemType, PaginationType, SortingType } from "../utils/types";
import { useSearchTextContext } from "../utils/hooks/useSearchTextContext";
import { JOBS_PER_PAGE } from "../utils/constants";

type JobItemsContextType = {
  handleSorting: (sorting: SortingType) => void;
  currentPage: number;
  slicedJobItems: JobItemType[];
  totalPages: number;
  handlePageChange: (direction: PaginationType) => void;
  loading: boolean;
  sorting: SortingType;
  jobItemsLength: number;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

const JobItemsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, loading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingType>("relevant");

  const handlePageChange = useCallback((direction: PaginationType) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const jobItemsLength = jobItems?.length || 0;

  const totalPages = jobItemsLength / JOBS_PER_PAGE;

  const sortedJobItems = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sorting === "recent") {
          return a.daysAgo - b.daysAgo;
        } else {
          return b.relevanceScore - a.relevanceScore;
        }
      }),
    [sorting, jobItems]
  );

  const slicedJobItems = useMemo(
    () =>
      sortedJobItems?.slice(
        (currentPage - 1) * JOBS_PER_PAGE,
        currentPage * JOBS_PER_PAGE
      ),
    [sortedJobItems, currentPage]
  );

  const handleSorting = (sorting: SortingType) => {
    setCurrentPage(1);
    setSorting(sorting);
  };

  return (
    <JobItemsContext.Provider
      value={{
        handleSorting,
        currentPage,
        slicedJobItems,
        totalPages,
        handlePageChange,
        loading,
        sorting,
        jobItemsLength,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
};

export default JobItemsContextProvider;
