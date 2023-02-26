import {MIDNIGHT} from "./config";
import {getEl} from "./helper";

const $time = getEl('.time');
const $date = getEl('.date');

export const showCurrentDate = (lang) => {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    $date.textContent = date.toLocaleDateString(lang, options);
}
export const showCurrentTime = (lang) => {
    const date = new Date();
    let currTime=date.toLocaleTimeString(lang);
    $time.textContent = currTime;
    if (date.getHours() === MIDNIGHT) showCurrentDate(lang);

    setTimeout(showCurrentTime, 1000,lang);
}

