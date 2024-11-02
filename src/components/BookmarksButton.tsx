import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import BookmarksPopover from "./BookmarksPopover";
import { useOnClickOutside } from "../utils/hooks/useOnclickOutside";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false));
  return (
    <section>
      <button
        ref={buttonRef}
        className="bookmarks-btn"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        Bookmarks <TriangleDownIcon />
        {isOpen && <BookmarksPopover ref={popoverRef} />}
      </button>
    </section>
  );
}
