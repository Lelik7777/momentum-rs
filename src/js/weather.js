import {CODE200, ENG, URLWEATHER} from "./config";
import {getEl} from "./helper";

const $weatherIcon = getEl('.weather-icon');
const $temperature = getEl('.temperature');
const $weatherDescription = getEl('.weather-description');
const $wind = getEl('.wind');
const $humidity = getEl('.humidity');
const $weatherError = getEl('.weather-error');
const $city = getEl('.city');
const dateArr = ['Wind speed: ', 'Скорость ветра: ', 'm/s', 'м/с', 'Humidity: ', 'Влажность: ', 'City don`t find for ', 'Город не найден для '];

export const getWeather = async (lang, city) => {
    $city.value = city;
    const res = await fetch(`${URLWEATHER}&q=${city}&lang=${lang}`);
    const data = await res.json();
    const boolean = lang === ENG;
    if (data.cod === CODE200) {
        $weatherIcon.className = 'weather-icon owf';
        $weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        $temperature.textContent = `${Math.floor(data.main.temp)}°C`;
        $weatherDescription.textContent = data.weather[0].description;
        $wind.textContent = `${boolean ? dateArr[0] : dateArr[1]}${Math.floor(data.wind.speed)} ${lang === ENG ? dateArr[2] : dateArr[3]}`;
        $humidity.textContent = `${boolean ? dateArr[4] : dateArr[5]}${Math.floor(data.main.humidity)} %`;
        $weatherError.textContent = '';
    } else {
        $weatherError.textContent = `${boolean ? dateArr[6] : dateArr[7]}${$city.value}`;
        $weatherIcon.className = 'weather-icon';
        $temperature.textContent='';
        $weatherDescription.textContent='';
        $wind.textContent='';
        $humidity.textContent='';
    }
}