import { forwardRef } from "react";
import JobList from "./JobList";
import { createPortal } from "react-dom";
import { useBookmarksContext } from "../utils/hooks/useBookmarksContext";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedItems, isLoading } = useBookmarksContext();

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
