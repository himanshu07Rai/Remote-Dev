import { SortingType } from "../utils/types";

type SortingControlsProps = {
  handleSorting: (sorting: SortingType) => void;
  sorting: SortingType;
};

export default function SortingControls({
  handleSorting,
  sorting,
}: SortingControlsProps) {
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
