import React from 'react';

// Create a search bar that updates with each character entered by the user
function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by first or last name"
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;