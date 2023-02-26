import {ENG} from "./config";

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}
export const getLocalStorage = (key) => localStorage.getItem(key);
export const deleteLocalStorage = (key) => localStorage.removeItem(key);

export const getEl = (selector) => document.querySelector(selector);

export const getRandomNumber = (min = 1, max = 20) => Math.floor(Math.random() * (max - min)) + min;

export const checkNumber = num => num < 10 ? String(num).padStart(2, '0') : num;

export const getPlaceholder = (lang, el) => lang === ENG ? el.placeholder = 'enter name' : el.placeholder = 'введите имя';