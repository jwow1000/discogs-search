
import { useState } from "react";
import SearchItem from './SearchItem';
import axios from "axios";
// import styles
import './Search.css'


function Search() {
    // react data
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [imgFocus, setImgFocus] = useState(-1);
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

    const reSearch = async function (t) {
        setSearchTerm((prevSearchTerm) => (t));
        setImgFocus(-1);
        const response = await axios.get(
            `${base}/database/search?q=${t}&type=releases&token=${myToken}&page=1&per_page=50`,
            {
                headers: {
                    'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
                }
            }

        );

        // set search results with the data
        setSearchResults(response.data);


    }

    return (
        <div id="div-Search">
            <div id={(startState) ? 'start-form' : 'post-form'}>
                <form
                    onSubmit={handleSubmit}

                >
                    <label> search for something
                        <input
                            id="search-term-Search"
                            type="text"
                            value={searchTerm}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </label>
                </form>
            </div>

            <div id="results-Search">

                {/* loop for the search items */}
                {
                    (searchResults.results) ?

                        searchResults.results.map((e, index) => {

                            // get img path
                            let imgPath = '';
                            imgPath = (e.cover_image) ? e.cover_image
                                : (e.thumb) ? e.thumb
                                    : console.log('nope');
                            const len = imgPath.length;
                            // create last three to see if it's a gif
                            let testString = imgPath[len - 3] + imgPath[len - 2] + imgPath[len - 1];
                            // is it gif? no print the image, yes skip
                            if (testString !== 'gif') {
                                // get links

                                return <SearchItem
                                    info={e.resource_url}
                                    reSearch={() => (reSearch(e.title))}
                                    discLink={`https://discogs.com/${e.uri}`}
                                    idx={index}
                                    key={index}
                                    img={imgPath}
                                    //reSearch={reSearch(e.title)}
                                    alt={e.title}
                                    imgFocus={imgFocus}
                                    setImgFocus={() => setImgFocus(index)}
                                    resetImgFocus={() => setImgFocus(-1)}
                                />
                            }
                        })

                        : null

                }
            </div>

        </div>


    )
}

export default Search
