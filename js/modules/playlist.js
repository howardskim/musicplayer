import {songList} from '../data/songs.js';
import PlayInfo from '../modules/play-info.js';
import TrackBar from '../modules/track-bar.js';

// Initial Render Function

const Playlist = (_ => {
    //data or state
    let songs = songList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);
    let isPlaying = false; //keep track of whether or not song is currently playing
    currentSong.currentTime = 0;
    //Caching the DOM

    const playListElement = document.querySelector('.playlist');

    const init = ()=>{
        console.log(songs);
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const flip = _=>{
        togglePlayPause();
        render();
    }

    const changeAudioSrc = () => {
        currentSong.src = songs[currentlyPlayingIndex].url;
    }

    const togglePlayPause = () => {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }
    const mainPlay = (clickedIndex) => {
        if(currentlyPlayingIndex === clickedIndex){
            //toggle play or pause
            togglePlayPause(); 
        } else {
            currentlyPlayingIndex = clickedIndex;
            changeAudioSrc();
            togglePlayPause();
        }
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }
    const playNext = _ => {
        currentlyPlayingIndex++;
        currentSong.src = songs[currentlyPlayingIndex].url;
        togglePlayPause();
        render();
    }
    //event listeners 
    const listeners = () => {
        //1. when we click on something we need to get the index of whatever was clicked. Specifically, the index of the li tag.
        //2. then change the current playing index to the index of the selected li tag
        //3. then we need to play or pause depending on the situation
        //4. if it is not the same song, then change the source to that new song
        playListElement.addEventListener('click', event => {
            //if the element exists and has a class of fa
            if(event.target && event.target.matches('.fa')){
                //we need to traverse the dom and get the actual list element of the event.target (which is just an icon) so that we can ultimately get the index #
                const listElement = event.target.parentNode.parentNode;
                const listCollection = [...listElement.parentElement.children];
                const listIndex = listCollection.indexOf(listElement); // .indexOf only works for arrays but not for HTML collections so this won't work
                console.log(listIndex);
                mainPlay(listIndex);
                render();
            }
        })

        currentSong.addEventListener('timeupdate', ()=>{
            TrackBar.setState(currentSong);
        })

        currentSong.addEventListener('ended', () => {
            if(currentlyPlayingIndex !== songList.length-1){
                playNext()
            }
        })
    }

    const render = () => {
        let markup = '';


        //currentSong.paused will return a boolean value depending on if it is paused or not
        const toggleIcon = itemIndex => {
            if(currentlyPlayingIndex === itemIndex){
                return currentSong.paused ? 'fa-play' : 'fa-pause'
            } else {
                return 'fa-play'
            }
        }

        songs.map((songObj, index) =>{
            markup+=`
            <li class="playlist__song ${index === currentlyPlayingIndex ? 'playlist__song--active' : ''}">
              <div class="play-pause">
                <i class="fa ${toggleIcon(index)} pp-icon"></i>
              </div>
              <div class="playlist__song-details">
                <span class="playlist__song-name">${songObj.title}</span>
                <br>
                <span class="playlist__song-artist">${songObj.artist}</span>
              </div>
              <div class="playlist__song-duration">
                <span>${songObj.time}</span>
              </div>
            </li>
            `;    
        })
        playListElement.innerHTML = markup;
    }
    
    
    return {
        init: init,
        flip: flip
    }
})();


export default Playlist;