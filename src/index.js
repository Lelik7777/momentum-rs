//import './index.html';
//i can write path in entry in webpack config
//import './css/style.css';
import {showCurrentDate, showCurrentTime} from "./js/timeDate";
import {getEl, getLocalStorage, getRandomNumber, setLocalStorage} from "./js/helper";
import {ACTIVE, ENG, LG, NAME, RU, URLGH} from "./js/config";
import {showGreeting} from "./js/greeting";
import {getImage} from "./js/backgroundImg";

const $ru = getEl('.ru');
const $eng = getEl('.eng');
const $name = getEl('.name');
let lang;

window.addEventListener('load', function () {
    for (let i = 0; i < 20; i++) console.log(getRandomNumber())
    if (getRandomNumber() < 10) document.body.style.backgroundImage = `url(${getImage(URLGH, showGreeting(ENG), ('0' + getRandomNumber()))})`
    else document.body.style.backgroundImage = `url(${getImage(URLGH, showGreeting(ENG), getRandomNumber())})`
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
        location.reload();
    } else {
        setLocalStorage('lg', ENG);
        lang = getLocalStorage(LG);
        location.reload();
    }
    $ru.classList.toggle(ACTIVE);
    $eng.classList.toggle(ACTIVE);
});
window.addEventListener('beforeunload', function () {
    if ($name.value) {
        setLocalStorage(NAME, $name.value);
    }
})

