import {getEl} from "./helper";

const $btnAudio = getEl('.btn__audio');
const active = 'item-active';
const play = 'play';
const pause = 'pause';

const audio = new Audio();

export const playAudio = (src) => {

    audio.src = src;
    if ($btnAudio.classList.contains(play)) {
        audio.currentTime = 0;
        audio.play();
        $btnAudio.classList.add(pause);
        $btnAudio.classList.remove(play);

    } else {
        audio.pause();
        $btnAudio.classList.remove(pause);
        $btnAudio.classList.add(play);

    }
}
export const playNext = (playList) => {
    document.querySelectorAll('.play-item').forEach((el, i, arr) => {
       // console.log(el)
        if (arr[arr.length - 1].classList.contains(active)) {
            console.log(el)
            arr[0].classList.add(active);
            el.classList.remove(active);
        } else
            if(el.classList.contains(active)) {
                console.log(el)
                el.classList.remove(active);
                arr[i + 1].classList.add(active);
            }

    })
}

