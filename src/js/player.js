import {getEl} from "./helper";


const $btnAudio = getEl('.btn__audio');
const $playList = getEl('.play-list');
const active = 'item-active';
const play = 'play';
const pause = 'pause';
let isPlay = false;
const audio = new Audio();


export const playAudio = (src, flag = false) => {
    audio.src = src;
    if (flag) {
        isPlay=false;
        audio.currentTime = 0;
        audio.play();
        $btnAudio.classList.add(pause);
    }
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        $btnAudio.classList.add(pause)
        isPlay = true;
    } else {
        audio.pause();
        $btnAudio.classList.remove(pause);
        isPlay = false;
    }
}


