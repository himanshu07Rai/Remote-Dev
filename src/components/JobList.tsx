import { useActiveIdContext } from "../utils/hooks";
import { JobItemType } from "../utils/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: JobItemType[];
  isLoading: boolean;
}) {
  const { activeId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem: JobItemType) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            active={jobItem.id === activeId}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
