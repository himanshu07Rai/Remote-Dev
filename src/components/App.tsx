import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../utils/hooks";
import { JOBS_PER_PAGE } from "../utils/constants";
import { SortingType, PaginationType } from "../utils/types";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, loading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState<SortingType>("relevant");

  const handlePageChange = (direction: PaginationType) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous") {
      setCurrentPage(currentPage - 1);
    }
  };

  const jobItemsLength = jobItems?.length || 0;

  const totalPages = jobItemsLength / JOBS_PER_PAGE;

  const sortedJobItems = [...(jobItems || [])].sort((a, b) => {
    if (sorting === "recent") {
      return a.daysAgo - b.daysAgo;
    } else {
      return b.relevanceScore - a.relevanceScore;
    }
  });

  const slicedJobItems = sortedJobItems?.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  const handleSorting = (sorting: SortingType) => {
    setCurrentPage(1);
    setSorting(sorting);
  };

  return (
    <>
      <div>
        <Background />
        <Header>
          <div className="header__top">
            <Logo />
            <BookmarksButton />
          </div>

          <SearchForm searchText={searchText} setSearchText={setSearchText} />
        </Header>

        <Container>
          <Sidebar>
            <div className="sidebar__top">
              <ResultsCount resultsCount={jobItemsLength} />
              <SortingControls
                handleSorting={handleSorting}
                sorting={sorting}
              />
            </div>
            <JobList jobItems={slicedJobItems || []} isLoading={loading} />
            <PaginationControls
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Sidebar>
          <JobItemContent />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default App;
