const TrackBar = (()=>{
    //state
    const state = {
        currentTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    //cache

    const trackBarEl = document.querySelector('.track-bar');
    const trackBarFillEl = document.querySelector('.track-bar__fill');

    const init = () => {
        render();
    }

    const render = _ => {
        trackBarFillEl.style.width=`${state.fillWidth}%`
    }

    const percentage = (current, full) => {
        return (current/full) * 100;
    }

    const setState = (obj) => {
        state.currentTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = percentage(state.currentTime, state.fullTrackTime);
        render();
    }
    return {
        init,
        setState
    }

})();

export default TrackBar;
