import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../utils/hooks/useBookmarksContext";

export default function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedJobs, handleBookmark } = useBookmarksContext();
  const isBookmarked = bookmarkedJobs.includes(id);
  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        handleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon className={`${isBookmarked ? "filled" : null}`} />
    </button>
  );
}
