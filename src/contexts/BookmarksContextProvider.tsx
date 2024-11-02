import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";
import { useJobItemsByIds } from "../utils/hooks/useJobItemsByIds";
import { JobItemDetailsType } from "../utils/types";

type BookmarksContextType = {
  bookmarkedJobs: number[];
  handleBookmark: (jobId: number) => void;
  bookmarkedItems: JobItemDetailsType[];
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

const BookmarksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarkedJobs, setBookmarkedJobs] = useLocalStorage<number[]>(
    "bookmarkedJobs",
    []
  );

  const { jobItems: bookmarkedItems, isLoading } =
    useJobItemsByIds(bookmarkedJobs);

  const handleBookmark = (jobId: number) => {
    if (bookmarkedJobs?.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter((id) => id !== jobId));
    } else {
      setBookmarkedJobs([...(bookmarkedJobs || []), jobId]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{ bookmarkedJobs, handleBookmark, bookmarkedItems, isLoading }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContextProvider;
