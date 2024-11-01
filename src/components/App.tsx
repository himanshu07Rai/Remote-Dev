import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import SearchForm from "./SearchForm";

function App() {
  return (
    <>
      <div>
        <Background />
        <Header />
        <SearchForm />
        <Container />
        <Footer />
      </div>
    </>
  );
}

export default App;
