import { useEffect, useState } from 'react';
import './App.css';
import Create from './components/Create';
import List from './components/List';
const apiUrl = process.env.REACT_APP_BACKEND_URL

function App() {
  const [series, setSeries] = useState([])
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch(`http://${apiUrl}/api/series`)
      .then(res => res.json())
      .then(data => {
        setSeries(data)
      })
  }, [isLoading])

  useEffect(() => {
    fetch(`http://${apiUrl}/api/movies`)
      .then(res => res.json())
      .then(data => {
        setMovies(data)
      })
  }, [isLoading])

  return (
    <div className="App">
      <div className="header">
        <h1>Movies and Series Tracker</h1>
        <Create setIsLoading={setIsLoading} />
        <div>
          Choose the category and create a new entry {isLoading && <span>Loading...</span>}
        </div>
      </div>
      <div className="lists">
        <div className="seriesList">
          <h2>Series</h2>
          <List data={series} setIsLoading={setIsLoading} type="series" />
        </div>
        <div className="moviesList">
          <h2>Movies</h2>
          <List data={movies} setIsLoading={setIsLoading} type="movies" />
        </div>
      </div>
    </div>
  );
}

export default App;
