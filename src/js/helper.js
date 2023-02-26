export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}
export const getLocalStorage = (value) => localStorage.getItem(value);

export const getEl = (selector) => document.querySelector(selector);

export const getRandomNumber = (min = 1, max = 20) => Math.floor(Math.random() * (max - min)) + min;