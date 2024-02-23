import React from 'react';
import SearchItem from './SearchItem';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './SearchPages.css';
import axios from "axios";



function SearchPages({ setSearchTerm, setSearchResults }) {
    const [imgFocus, setImgFocus] = useState(-1);
    // what the hellll?!@
    const { key, array } = useParams();
    const base = 'https://api.discogs.com';
    const myToken = 'dgoPiRdAagChWVYQqpfTKEYSVAJGpdSpPxuisxkx';
    console.log('wow', key);

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
        <div>
            <div id="results-Search">

                {/* loop for the search items */}
                {
                    (array) ?

                        array.map((e, index) => {

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

export default SearchPages