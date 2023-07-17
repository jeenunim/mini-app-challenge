import './App.css';
import React, { useState } from 'react'

function App() {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  return (
    <div className="App">
      MOVIES LIST
      <div>
      <form className="moveSearch" onSubmit={handleSubmit}>
            <input
              className="movieSearchButton"
              type='search'
              placeholder='Movie Search'
              onChange={handleChange}
              value={searchInput}>
            </input>
          </form>
      </div>
      <div>
        {movies.filter(e => e.title.toLowerCase().trim().includes(searchInput.toLowerCase().trim())).map((e => e.title))}
      </div>
    </div>
  );
}

export default App;
