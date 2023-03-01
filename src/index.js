//import './index.html';
//i can write path in entry in webpack config
import './css/style.css';
import sounds from "./assets/sounds/sounds";
import {showCurrentDate, showCurrentTime} from "./js/timeDate";
import {
    checkNumber,
    deleteLocalStorage,
    getEl, getInputById, getInputByName,
    getLocalStorage,
    getPlaceholder,
    getRandomNumber,
    setLocalStorage
} from "./js/helper";
import {
    ACTIVE,
    CITY,
    ENG,
    FLICKR,
    GH,
    ITEM_ACTIVE,
    LG,
    NAME,
    PLAYER,
    QUOTE,
    RU, SETTINGS,
    TIME,
    URLGH,
    WEATHER
} from "./js/config";
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
const $btnAudio = getEl('.btn__audio');
const $playPrev = getEl('.play-prev');
const $playNext = getEl('.play-next');
const $settingIcon = getEl('.setting-icon');
const $settings = getEl('.settings');
let playNum = 0;
let randomValue = getRandomNumber();
let lang;
let isShowTime;
let isShowPlayer;
let isShowWeather;
let isShowQuote;
let isShowGh;
let isShowFlickr;
let isShowSettings=null;
let count = 0;
let count2 = 0;

window.addEventListener('load', function () {
    //add music list
    sounds.forEach((el, i) => {
        const li = document.createElement('li');
        li.textContent = el.title;
        if (i === 0) li.classList.add('item-active');
        li.classList.add('play-item');
        $playList.append(li);
    });

    //set data in local storage




    lang = getLocalStorage(LG);
    $eng.classList.add(ACTIVE);
    getPlaceholder(lang, $name);

    isShowTime = getLocalStorage(TIME);
    getInputByName(TIME).checked = isShowTime;

    isShowWeather = getLocalStorage(WEATHER);
    getInputByName(WEATHER).checked = isShowWeather;

    isShowPlayer = getLocalStorage(PLAYER);
    getInputByName(PLAYER).checked = isShowPlayer;

    isShowQuote = getLocalStorage(QUOTE);
    getInputByName(QUOTE).checked = isShowQuote;

    isShowGh = getLocalStorage(GH);
    getInputById(GH).checked = isShowGh;

    isShowSettings = getLocalStorage(SETTINGS);
    console.log(isShowSettings)
    if (isShowSettings) {
        console.log('show settings')
    }

    if (lang === undefined) setLocalStorage(LG, ENG);
    if (isShowWeather === undefined) setLocalStorage(WEATHER, true);
    if (isShowTime === undefined) setLocalStorage(TIME, true);
    if (isShowPlayer === undefined) setLocalStorage(PLAYER, true);
    if (isShowQuote === undefined) setLocalStorage(QUOTE, true);
    if (isShowGh === undefined) setLocalStorage(GH, true);
    if (isShowFlickr === undefined) setLocalStorage(FLICKR, false);
    if (isShowSettings === undefined) {
        setLocalStorage(SETTINGS, false);
    }
    console.log(isShowSettings)
    if(isShowSettings)
    //$settings.classList.add(ACTIVE);

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
        setLocalStorage(LG, RU);
        lang = getLocalStorage(LG);
        location.reload();
    } else {
        setLocalStorage(LG, ENG);
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
            } else {
                randomValue = 1;
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

$btnAudio.addEventListener('click', function () {
    playAudio(sounds[playNum].src);
})
$playNext.addEventListener('click', function () {
    $playList.children[playNum].classList.remove(ITEM_ACTIVE);
    playNum++;
    if (playNum >= sounds.length) playNum = 0;
    $playList.children[playNum].classList.add(ITEM_ACTIVE);
    playAudio(sounds[playNum].src, true);
});
$playPrev.addEventListener('click', function () {
    $playList.children[playNum].classList.remove(ITEM_ACTIVE);
    playNum--;
    if (playNum === -1) playNum = sounds.length - 1;
    $playList.children[playNum].classList.add(ITEM_ACTIVE);
    playAudio(sounds[playNum].src, true);
});

//settings
$settingIcon.addEventListener('click', function () {
    $settings.classList.toggle(ACTIVE);
    if ($settings.classList.contains(ACTIVE)) {

    } else console.log('not active')
});
document.body.addEventListener('click', function () {
    if ($settings.classList.contains(ACTIVE)) {
        setLocalStorage(SETTINGS, true);
        isShowSettings = getLocalStorage(SETTINGS);
    } else {
        setLocalStorage(SETTINGS, false);
        isShowSettings = getLocalStorage(SETTINGS);
    }
})
$settings.addEventListener('change', function (e) {
    console.log(e.target)
});
