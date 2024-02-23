import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SearchForm from "./SearchForm.jsx";
import Navbar from "./Navbar.jsx";
import Gallery from "./Gallery.jsx";
import axios from "axios";
import SearchPages from "./SearchPages.jsx";

function App() {
  const base = "https://api.discogs.com";
  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [startState, setStartState] = useState(true);
  // const [searchPage, setSearchPage] = useState(1); // default to first page
  // api stuff
  
  // handle change of search term
  const handleChange = function (e) {
    // const str = e.target.value;
    setSearchTerm(e.target.value);
  };
  
  // handle submit of search term
  const handleSubmit = function (e) {
    e.preventDefault();
    fetchSearch(1);
    // change start state to false now that we entered a search
    setStartState(false);
    // console.log('check on start state', startState);
    // console.log('what is this', searchResults);
  };
  
  // fetch call for search, reuturn json object
  const fetchSearch = async (searchPage, term) => {
    setStartState(false);
    
    const response = await axios.get(
      `${base}/database/search?q=${term ? term : searchTerm}&type=all&token=${process.env.REACT_APP_API_TOKEN}&page=${searchPage}&per_page=25`,
      {
        headers: {
            'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
        }
      }
    );

    // set search results with the data
    setSearchResults(response.data);
  };

  // radndom search, get random search item than send it to fetchSearch
  async function randomSearch() {
    // get random labels artists, releases
    let which = '';
    let r = Math.floor(Math.random() * 3);
    which = ( r === 0) ? 'labels' : (r === 1) ? 'artists' : 'releases';
    // console.log("Random index: ", randoIndex, which)
    let randomNum = (Math.random() * 200000);
    // console.log('which', which, randoIndex);
    const floorRando = Math.floor(randomNum);
    console.log(`${base}/${which}/${floorRando}`);
    const response = await axios.get(
      
      `${base}/${which}/${floorRando}`,
      {
        headers: {
            'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
        }
      }
    );
    
    
    // console.log('this is the data', data.name);
    const sTerm = response.data.title || response.data.name
    setSearchTerm(sTerm);
    fetchSearch(1,sTerm);

  }

  // do the reSearch, take a new term and search again
  function reSearch(term) {
    
    setSearchTerm(term);
    fetchSearch(1,term);
    
  }

  return (
    <div className="App">
      <div id="div-Search">
        <div id={startState ? "start-form" : "post-form"}>
          <SearchForm handleSubmit={handleSubmit} 
              handleChange={handleChange} 
              searchTerm={searchTerm} 
              randomSearch={randomSearch}
          />
        </div>
      </div>

      { searchResults.pagination && 
       <Navbar searchResults={searchResults}/>
      }

      <Routes>
        <Route path='/' element={<Gallery searchResults={searchResults} fetchSearch={fetchSearch} reSearch={reSearch}/>}/>
        {searchResults.pagination && <Route path="/" element={<Gallery searchResults={searchResults} fetchSearch={fetchSearch} reSearch={reSearch}/>} />}
        <Route path="/pages/:page_num" element={<Gallery searchResults={searchResults} fetchSearch={fetchSearch} reSearch={reSearch}/>} />
      </Routes>
    </div>
  );
}

export default App;