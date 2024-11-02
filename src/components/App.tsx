import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import SearchForm from "./SearchForm";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobListSearch from "./JobListSearch";

function App() {
  return (
    <>
      <div>
        <Background />
        <Header>
          <div className="header__top">
            <Logo />
            <BookmarksButton />
          </div>

          <SearchForm />
        </Header>

        <Container>
          <Sidebar>
            <div className="sidebar__top">
              <ResultsCount />
              <SortingControls />
            </div>
            <JobListSearch />
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
