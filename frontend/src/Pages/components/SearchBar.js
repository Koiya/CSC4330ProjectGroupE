const SearchBar = () => (
    <form action="/frontend/src/Pages" method="get">
        <input
            type="text"
            id="header-search"
            placeholder="Look For Tutors"
            className="searchBar"
        />
        <button className="searchBarButton" type="submit">Search</button>
    </form>
);

export default SearchBar;