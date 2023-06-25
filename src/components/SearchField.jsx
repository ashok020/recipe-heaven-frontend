import { useState } from "react";
import "./SearchField.css";

export function SearchField({ searchValue, Icon, handleSearch, placeholder }) {
  const [search, setSearch] = useState(searchValue);
  function handleInputChange(e) {
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(search);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleInputChange}
      />
      <div className="search-icon item-center" onClick={handleSubmit}>
        <Icon className="icon" />
      </div>
    </form>
  );
}
