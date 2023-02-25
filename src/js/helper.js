import {ENG} from "./config";

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}
export const getLocalStorage = (value) => localStorage.getItem(value);

export const getEl = (selector) => document.querySelector(selector);