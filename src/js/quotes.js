import {quotesList} from "./quotesList";
import {ENG} from "./config";
import {getEl, getRandomNumber} from "./helper";
const $quote=getEl('.quote');
const $author=getEl('.author');

export const getQuotes=  (lang)=>{
    const randomValue=getRandomNumber(0,101);
    const quote=lang===ENG?quotesList[randomValue].en:quotesList[randomValue].ru;
    $quote.textContent=quote.text;
    $author.textContent=quote.author;
    console.log(quote)
}