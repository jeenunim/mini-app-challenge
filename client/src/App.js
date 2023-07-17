import './App.css';
import React, { useState, useEffect } from 'react'

function App() {
  const movies = [
    {title: 'Mean Girls'},
    {title: 'Hackers'},
    {title: 'The Grey'},
    {title: 'Sunshine'},
    {title: 'Ex Machina'},
  ];

  const [movieData, setMovieData] = useState([])
  const [name, setName] = useState('');
  const [deletedMovie, setDeletedMovie] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(
        response => response.json()
      )
      .then(data => setMovieData(data))
  }, []);

  const [searchInput, setSearchInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  }

  const addMovie = (e) => {
    e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {name}
                )
        };
        fetch('http://localhost:3001/movies', requestOptions)
        .then(() => {alert('Movie added successfully'); setTimeout(window.location.reload(), 3000)})
  }

  const deleteMovie = (e) => {
    e.preventDefault();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {name: deletedMovie}
              )
        };
        fetch(`http://localhost:3001/movies`, requestOptions)
        .then(() => {alert('Movie deleted successfully'); setTimeout(window.location.reload(), 3000)})
  }
  

  return (
    <div className="App">
      MOVIES LIST
      <div>
          <form className="movieSearch" onSubmit={handleSubmit}>
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
        {movieData.filter(e => e.name.toLowerCase().trim().includes(searchInput.toLowerCase().trim()))
        .map((e => <li> {e.name}</li>))}
      </div>
      <div>
        <form onSubmit={addMovie}>
          <label className="labelHeaders">Add Movie:
            <input name="add-movie"
            type='text'
            required
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
          </label><br/><br/>
        </form>
      </div>
      <div>
        <form onSubmit={deleteMovie}>
          <label className="labelHeaders">Delete Movie:
            <input name="delete-movie"
            type='text'
            required
            value={deletedMovie} 
            onChange={(e) => setDeletedMovie(e.target.value)}/>
          </label><br/><br/>
        </form>
      </div>
    </div>
  );
}

export default App;
