import './App.css';
import { useEffect, useState } from "react";
import { Route, Link, Routes } from 'react-router-dom';
import Search from './Search.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [startState, setStartState] = useState(true);

  const base = 'https://api.discogs.com';
  const myToken = 'dgoPiRdAagChWVYQqpfTKEYSVAJGpdSpPxuisxkx';

  // handle change of search term
  const handleChange = function (e) {
    const str = e.target.value;
    setSearchTerm((prevSearchTerm) => (str));
  }

  // handle submit of search term
  const handleSubmit = function (e) {
    e.preventDefault();
    fetchSearch(searchTerm);
    // change start state to false now that we entered a search
    setStartState(false);
    // console.log('check on start state', startState);
    // console.log('what is this', searchResults);
  }

  // fetch call for search, reuturn json object
  const fetchSearch = async (term) => {
    //console.log('running');
    const response = await axios.get(
      `${base}/database/search?q=${term}&type=all&token=${myToken}&page=1&per_page=50`,
      {
        headers: {
          'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
        }
      }

    );
    // console.log('stuff', response.data);
    // set search results with the data
    setSearchResults(response.data);

  }

  function Navbar() {
    searchResults.map((e, i) => {
      return <a> page${i}</a>
    });
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<h2>Welcome Home!</h2>}
        />
        <Route
          path="/union-square"
          element={<Station stationId="100" />}
        />
        <Route
          path="/other-place"
          element={<Station stationId="127" />}
        />

      </Routes>



    </div>
  );
}

export default App;
