


const audio = new Audio();

export const playAudio = (src) => {
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}
export const pauseAudio = src => {
    audio.src=src;
    audio.pause();
}
