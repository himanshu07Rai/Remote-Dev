import { useEffect, useState } from "react";
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

function App() {
  const [searchText, setSearchText] = useState("");
  const [jobItems, setJobItems] = useState([]);
  useEffect(() => {
    if (!searchText) return;
    fetch(
      `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => setJobItems(data.jobItems));
  }, [searchText]);
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
              <ResultsCount />
              <SortingControls />
            </div>
            <JobList jobItems={jobItems} />
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
