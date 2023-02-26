//import './index.html';
//i can write path in entry in webpack config
//import './css/style.css';
import {showCurrentDate, showCurrentTime} from "./js/timeDate";
import {
    checkNumber,
    deleteLocalStorage,
    getEl,
    getLocalStorage,
    getPlaceholder,
    getRandomNumber,
    setLocalStorage
} from "./js/helper";
import {ACTIVE, ENG, LG, NAME, RU, URLGH} from "./js/config";
import {showGreeting} from "./js/greeting";
import {getBackgroundImg} from "./js/backgroundImg";


const $ru = getEl('.ru');
const $eng = getEl('.eng');
const $name = getEl('.name');
const sliderPrev = getEl('.slide-prev');
const sliderNext = getEl('.slide-next');
let randomValue = getRandomNumber();
let lang;


window.addEventListener('load', function () {

    lang = getLocalStorage(LG);
    //set lg in local storage
    if (!lang) {
        setLocalStorage(LG, ENG);
        lang = getLocalStorage(LG);
        $eng.classList.add(ACTIVE);
        getPlaceholder(lang, $name);
    }

    if (lang === ENG) {
        $eng.classList.add(ACTIVE);
        getPlaceholder(lang, $name);

    } else {
        $ru.classList.add(ACTIVE);
        getPlaceholder(lang, $name);
    }


    if (getLocalStorage(NAME)) {
        $name.value = getLocalStorage(NAME).split('')
            .map((char, i) => i === 0 ? char.toUpperCase() : char).join('');
    }

    showCurrentTime(lang);
    showCurrentDate(lang);
    showGreeting(lang);
    getBackgroundImg(URLGH, showGreeting(ENG), checkNumber(randomValue));

});

//change language
document.querySelector('.lng').addEventListener('click', function () {
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
    } else deleteLocalStorage(NAME);
});

// slider
[sliderPrev, sliderNext].forEach((el, i) => {
    el.addEventListener('click', function () {
        if (i === 0) {
            if (randomValue > 1)
                randomValue--;
            else randomValue = 20;

            getBackgroundImg(URLGH, showGreeting(ENG), checkNumber(randomValue));

        } else {
            if (randomValue < 20){
                randomValue++;
                console.log(randomValue)
            }

            else{
                randomValue = 1;
                console.log(randomValue)
            }


            getBackgroundImg(URLGH, showGreeting(ENG), checkNumber(randomValue));
        }

    })
})

