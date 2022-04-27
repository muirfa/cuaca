import "./style.css";

const api = {
    key: "ba153ec465f3889aa6fe7346ce64bf32",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox  = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResult(searchbox.value);
    }
}

function getResult(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(cuaca => {
        return cuaca.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let kota = document.querySelector('.lokasi .kota');
    kota.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let tgl = document.querySelector('.lokasi .tgl');
    tgl.innerText = dateBuilder(now);

    let temp =  document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span> &deg;C</span>`;

    let weather_el = document.querySelector('.current .cuaca');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}C / ${weather.main.temp_max} C`;
}

function dateBuilder(d){
    let months =["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday","Saturday"];

    let day =  days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}