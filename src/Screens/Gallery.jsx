import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchItem from "../Components/SearchItem";
import './Gallery.css';

function Gallery({ searchResults, fetchSearch, reSearch }) {
    const [imgFocus, setImgFocus] = useState(-1);
    const { page_num } = useParams(1);


    useEffect(() => {
        if(page_num) {
            fetchSearch(page_num)
        }
    }, [page_num,fetchSearch])

  return searchResults.results ? (
    <div id="results-Search">
       
        {   
            searchResults.results.map((e, index) => {
            // get img path
            let imgPath = '';
            imgPath = (e.cover_image) ? e.cover_image
                : (e.thumb) ? e.thumb
                    : null;
            const len = imgPath.length;
            // create last three to see if it's a gif
            let testString = imgPath[len - 3] + imgPath[len - 2] + imgPath[len - 1];
            // is it gif? no? print the image, yes? skip
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
            } else {
                return null
            }
            
            }
        )}
    </div>
  ) : null;
}

export default Gallery

