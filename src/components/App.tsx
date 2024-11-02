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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, loading } = useJobItems(debouncedSearchText);

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
              <ResultsCount resultsCount={jobItems?.length || 0} />
              <SortingControls />
            </div>
            <JobList
              jobItems={jobItems?.slice(0, 7) || []}
              isLoading={loading}
            />
            <PaginationControls />
          </Sidebar>
          <JobItemContent />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default App;
