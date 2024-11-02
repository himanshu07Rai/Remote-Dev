import JobList from "./JobList";
import { useJobItemsContext } from "../utils/hooks/useJobItemsContext";

const JobListSearch = () => {
  const { slicedJobItems, loading } = useJobItemsContext();

  return <JobList jobItems={slicedJobItems} isLoading={loading} />;
};

export default JobListSearch;
