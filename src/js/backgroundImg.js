import {RANDOM_VALUE} from "./config";

export const getImage = (url, time, randomNum) => `${url}/${time}/${randomNum}.jpg`;

export const getBackgroundImg = (url, time, randomNum) => {
    const img = new Image();
    img.src = `${getImage(url, time, randomNum)}`;
    img.onload = () => document.body.style.backgroundImage = `url(${img.src})`;
}

// export const getSlideNext = () => {
//     if (RANDOM_VALUE < 20) RANDOM_VALUE+=1;
//     else RANDOM_VALUE = 1;
//
//
// }
// export const getSlidePrev = () => {
//     if (RANDOM_VALUE > 1) RANDOM_VALUE-=1;
//     else RANDOM_VALUE = 20;
// }