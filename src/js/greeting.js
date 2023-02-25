import {ENG, MIDNIGHT, SIX, SIXTEEN, TWELVE} from "./config";
import {getEl} from "./helper";

const $greeting = getEl('.greeting');

const timeOfDayEng = ['Good morning,', 'Good afternoon,', 'Good evening,', 'Good night,'];
const timeOfDayRu = ['Доброе утро,', 'Добрый день,', ' Добрый вечер,', 'Доброй ночи,'];

export const showGreeting = (lang) => {
    const date = new Date();
    const time = date.getHours();

    const getGreeting = time => {
        switch (time) {
            case time >= MIDNIGHT && time < SIX:
                return lang === ENG ? timeOfDayEng[0] : timeOfDayRu[0];
            case time >= SIX && time < TWELVE:
                return lang === ENG ? timeOfDayEng[1] : timeOfDayRu[1];
            case time >= TWELVE && time < SIXTEEN:
                return lang === ENG ? timeOfDayEng[2] : timeOfDayRu[2];
            default:
                return lang === ENG ? timeOfDayEng[3] : timeOfDayRu[3];
        }
    }
    $greeting.textContent = getGreeting(time);
}
