import Playlist from './playlist.js';

const PlayInfo = (()=> {
    // let songsLength = 0;
    // let isPlaying = false;
    const state = {
        songsLength: 0,
        isPlaying: false
    }

    const playerCountEl = document.querySelector('.player__count');
    const playerTriggerEl = document.querySelector('.player__trigger');

    const init = _=>{
        render();
        listeners();
    }

    const listeners = _ =>{
        playerTriggerEl.addEventListener('click', ()=>{
            //1. change PlayInfo's own state
            //2. Render it 
            //3. Toggle the playpause song functionality
            state.isPlaying = state.isPlaying ? false : true;  
            render();
            Playlist.flip();
        })
    }
    const setState = (obj) => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }
    const render =_=>{
        playerCountEl.innerHTML = state.songsLength;
        playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play';
    }
    return {
        init,
        setState
    }

})();

export default PlayInfo;