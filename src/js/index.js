//import {ajax} from "./model";

let response = fetch('https://api.chucknorris.io/jokes/random');
response.then(res => res.json()).then(data => console.log(data.value));
