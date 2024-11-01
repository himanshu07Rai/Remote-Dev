import { JobItemType } from "../lib/constants";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: JobItemType[];
  isLoading: boolean;
}) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem: JobItemType) => (
          <JobListItem jobItem={jobItem} />
        ))
      )}
    </ul>
  );
}

export default JobList;
