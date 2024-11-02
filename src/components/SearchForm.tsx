import { useSearchTextContext } from "../utils/hooks/useSearchTextContext";

export default function SearchForm() {
  const { handleSearchTextChange } = useSearchTextContext();
  return (
    <form action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
        onChange={(e) => handleSearchTextChange(e.target.value)}
      />
    </form>
  );
}
