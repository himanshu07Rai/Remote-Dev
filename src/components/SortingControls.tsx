import { useJobItemsContext } from "../utils/hooks/useJobItemsContext";
import { SortingType } from "../utils/types";

export default function SortingControls() {
  const { handleSorting, sorting } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        sorting={sorting}
        handleSorting={handleSorting}
        type="relevant"
      />
      <SortingButton
        sorting={sorting}
        handleSorting={handleSorting}
        type="recent"
      />
    </section>
  );
}

function SortingButton({
  sorting,
  handleSorting,
  type,
}: {
  sorting: SortingType;
  handleSorting: (sorting: SortingType) => void;
  type: SortingType;
}) {
  return (
    <button
      className={`sorting__button sorting__button--${type} ${
        sorting === type ? "sorting__button--active" : ""
      }`}
      onClick={() => handleSorting(type)}
    >
      {type}
    </button>
  );
}
