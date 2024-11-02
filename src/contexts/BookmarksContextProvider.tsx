import { createContext } from "react";
import useLocalStorage from "../utils/hooks/useLocalStorage";

type BookmarksContextType = {
  bookmarkedJobs: number[];
  handleBookmark: (jobId: number) => void;
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

  const handleBookmark = (jobId: number) => {
    if (bookmarkedJobs?.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter((id) => id !== jobId));
    } else {
      setBookmarkedJobs([...(bookmarkedJobs || []), jobId]);
    }
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkedJobs, handleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export default BookmarksContextProvider;
