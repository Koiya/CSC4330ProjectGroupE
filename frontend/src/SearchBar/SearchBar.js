const SearchBar = () => (
    <form action="/" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Search for tutors"
        />
        <button type="submit">Search</button>
    </form>
);

export default SearchBar;