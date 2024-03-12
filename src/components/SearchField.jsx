const SearchField = ({ searchQuery, setSearchQuery }) => (
  <p className="control has-icons-left has-icons-right">
    <input
      data-cy="SearchField"
      type="text"
      className="input"
      placeholder="Search"
      value={searchQuery}
      onChange={event => setSearchQuery(event.target.value)}
    />
    <span className="icon is-left">
      <i className="fas fa-search" aria-hidden="true" />
    </span>

    {searchQuery && (
      <span className="icon is-right">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="ClearButton"
          type="button"
          className="delete"
          onClick={() => setSearchQuery('')}
        />
      </span>
    )}
  </p>
);

export default SearchField;