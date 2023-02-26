import {ENG, MIDNIGHT, SIX, SIXTEEN, TWELVE} from "./config";
import {getEl} from "./helper";

const $greeting = getEl('.greeting');

const timeOfDayEng = ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,'];
const timeOfDayRu = ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', ' Добрый вечер,'];

export const showGreeting = (lang) => {
    const date = new Date();
    const time = date.getHours();

    const getGreeting = time => {

        if (time >= MIDNIGHT && time < SIX)
            return lang === ENG ? timeOfDayEng[0] : timeOfDayRu[0];
        if (time >= SIX && time < TWELVE)
            return lang === ENG ? timeOfDayEng[1] : timeOfDayRu[1];
        if (time >= TWELVE && time < SIXTEEN)
            return lang === ENG ? timeOfDayEng[2] : timeOfDayRu[2];
        else
            return lang === ENG ? timeOfDayEng[3] : timeOfDayRu[3];

    }
    $greeting.textContent = getGreeting(time);
    return getGreeting(time).replace(/good/i, '').replace(/\,/, '').trim();
}
