import { useJobItemsContext } from "../utils/hooks/useJobItemsContext";

export default function ResultsCount() {
  const { jobItemsLength } = useJobItemsContext();
  return <p className="count">{`${jobItemsLength} results`} </p>;
}
