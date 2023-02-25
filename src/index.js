//import './index.html';
//i can write path in entry in webpack config
//import './css/style.css';
import {showCurrentDate, showCurrentTime} from "./js/timeDate";
import {getEl, getLocalStorage, setLocalStorage} from "./js/helper";
import {ACTIVE, ENG, LG, NAME, RU} from "./js/config";
import {showGreeting} from "./js/greeting";

const $ru = getEl('.ru');
const $eng = getEl('.eng');
const $name = getEl('.name');
let lang;

window.addEventListener('load', function () {
    lang = getLocalStorage(LG);
    //set lg in local storage
    if (!lang) {
        setLocalStorage(LG, ENG);
        lang = getLocalStorage(LG);
        $eng.classList.add(ACTIVE);
    }

    if (lang === ENG) {
        $eng.classList.add(ACTIVE);

    } else $ru.classList.add(ACTIVE);


    if (getLocalStorage(NAME)) {
        $name.value = getLocalStorage(NAME).split('')
            .map((char, i) => i === 0 ? char.toUpperCase() : char).join('');
    }

    showCurrentTime(lang);
    showCurrentDate(lang);
    showGreeting(lang);

});
document.querySelector('.lng').addEventListener('click', function () {
    //console.log(lang)
    if (lang === ENG) {
        setLocalStorage('lg', RU);
        lang = getLocalStorage(LG);
        showCurrentDate(lang);
        showGreeting(lang);
    } else {
        setLocalStorage('lg', ENG);
        lang = getLocalStorage(LG);
        showCurrentDate(lang);
        showGreeting(lang);
    }
    $ru.classList.toggle(ACTIVE);
    $eng.classList.toggle(ACTIVE);
});
window.addEventListener('beforeunload', function () {
    if ($name.value) {
        setLocalStorage(NAME, $name.value);
    }
})

