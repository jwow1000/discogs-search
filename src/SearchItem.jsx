import axios from "axios";
import './SearchItem.css';

function SearchItem({ img, alt, idx, info, discLink,
    reSearch, imgFocus, setImgFocus, resetImgFocus }) {
    const myToken = 'dgoPiRdAagChWVYQqpfTKEYSVAJGpdSpPxuisxkx';


    // click focuses image, click again puts it back, user can clik on other images, until back
    function handleClick() {

        // is focus == -1 (focus is off)
        if (imgFocus === -1) {
            // set focus with this key value
            setImgFocus();

        } else if (imgFocus === idx) {
            // turn off (set -1)
            resetImgFocus();
        } else if (imgFocus !== idx) {
            // switch the images
            setImgFocus();
        }
        console.log('in Search Item discogs link', discLink);
    }

    // fetch call to take user to first youtube link
    async function handleVideoLink() {

        const response = await axios.get(
            info,
            {
                headers: {
                    'User-Agent': `reSearchDiscogs/1.0 +https://github.com/jwow1000/SoundProject_api`
                }
            }

        );
        const point = response.data.videos;
        if (point) {
            //console.log(point[0].uri);
            window.open(point[0].uri, '_blank')
        } else {
            alert('no videos available');
        }
    }

    function handleDiscLink() {
        console.log(discLink);
        window.open(discLink, '_blank');
    }

    function handleReSearch() {
        resetImgFocus();
        reSearch();

    }


    function Links() {
        if (imgFocus === idx) {
            return (
                <div>
                    <div className='links' id='dicogs-link' onClick={handleDiscLink}>discogs</div>
                    <div className='links' id='research-link' onClick={handleReSearch}>reSearch</div>
                    <div className='links' id='youtube-link' onClick={handleVideoLink}>youtube</div>
                </div>
            )
        }
    }
    return (
        <div id='div-SearchItem'>
            {/* if image link exists make image, if not print div with alt text*/}

            { img ? <img
                src={img}
                alt={alt}
                onClick={handleClick}
                id={(imgFocus === idx) ? 'focused' : 'normal'}
            />
            : <div id='alt-img'>
                {alt}
            </div>
            }
            
            <Links />

        </div>
    )
}

export default SearchItem;