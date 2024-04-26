import React from 'react'
import "./SearchForm.css"; 

function SearchForm({handleSubmit, handleChange, searchTerm, randomSearch}) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
          <label>
              {" "}
              search for something
              <input
              id="search-term-Search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              autoComplete="off"
              />
          </label>
      </form>
      <div id='random-butt' onClick={randomSearch}> get random search </div>
    </div>
  )
}

export default SearchForm