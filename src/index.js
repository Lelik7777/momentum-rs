//import './index.html';
//i can write path in entry in webpack config
import './css/style.css';
import sounds from "./assets/sounds/sounds";
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
import {ACTIVE, CITY, ENG, LG, NAME, RU, URLGH} from "./js/config";
import {showGreeting} from "./js/greeting";
import {getBackgroundImg} from "./js/backgroundImg";
import {getWeather} from "./js/weather";
import {getQuotes} from "./js/quotes";
import {playAudio} from "./js/player";


const $ru = getEl('.ru');
const $eng = getEl('.eng');
const $name = getEl('.name');
const $city = getEl('.city');
const $changeQuote = getEl('.change-quote');
const $sliderPrev = getEl('.slide-prev');
const $sliderNext = getEl('.slide-next');
const $playList = getEl('.play-list');
const $player = getEl('.player');
const $mainAudio = getEl('.btn__audio');
const $playPrev = getEl('.play-prev');
const $playNext = getEl('.play-next');
let randomValue = getRandomNumber();
let lang;
let isPlay = false;


window.addEventListener('load', function () {
    //add music list
    sounds.map(el => {
        const li = document.createElement('li');
        li.textContent = el.title;
        li.classList.add('play-item');
        $playList.append(li);
    });

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

    getBackgroundImg(URLGH, showGreeting(ENG, false), checkNumber(randomValue));
    showCurrentTime(lang);
    showCurrentDate(lang);
    showGreeting(lang);
    getQuotes(lang);

    if (getLocalStorage(CITY)) {
        getWeather(lang, getLocalStorage(CITY));
    } else {
        if (lang === ENG) getWeather(lang, 'Minsk');
        else getWeather(lang, 'Минск');
    }

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
[$sliderPrev, $sliderNext].forEach((el, i) => {
    el.addEventListener('click', function () {
        if (i === 0) {
            if (randomValue > 1)
                randomValue--;
            else randomValue = 20;

            getBackgroundImg(URLGH, showGreeting(ENG, false), checkNumber(randomValue));

        } else {
            if (randomValue < 20) {
                randomValue++;
                console.log(randomValue)
            } else {
                randomValue = 1;
                console.log(randomValue)
            }


            getBackgroundImg(URLGH, showGreeting(ENG, false), checkNumber(randomValue));
        }

    })
});

//weather
$city.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        setLocalStorage(CITY, this.value);
        getWeather(lang, this.value);
    }
});
//quote
$changeQuote.addEventListener('click', function () {
    getQuotes(lang);
});

$mainAudio.addEventListener('click', playAudio);

