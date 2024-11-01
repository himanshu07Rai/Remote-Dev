import JobListItem from "./JobListItem";

export function JobList({ jobItems }: { jobItems: unknown[] }) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem: unknown) => (
        <JobListItem jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
