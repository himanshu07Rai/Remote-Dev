export default function ResultsCount({
  resultsCount,
}: {
  resultsCount: number;
}) {
  return <p className="count">{`${resultsCount} results`} </p>;
}
