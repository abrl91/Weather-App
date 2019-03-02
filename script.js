let appId = '1b49b481183777f23495525ca66d2f27';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) {
        searchMethod = 'zip';
    } else {
        searchMethod = 'q';
    }
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then(result => {
            return result.json();
        })
        .then(result => {
            init(result);
        });
}

function init(resultFromServer) {
    console.log(resultFromServer);
    switch(resultFromServer.weather[0].main) {
        case 'Clear':
        document.body.style.backgroundImage = 'url("images/4k-wallpaper-blue-sky-blur-281260.jpg")';
            break;

        case 'Clouds':
        document.body.style.backgroundImage = 'url("images/clouds-cloudscape-cloudy-158163.jpg")';
            break;

        case 'Rain':
        document.body.style.backgroundImage = 'url("images/lightning-sky-storm-53459.jpg)';
        case 'Drizzle':
        document.body.style.backgroundImage = 'url("images/4k-wallpaper-blue-sky-blur-281260.jpg")';
        case 'Mist':
        document.body.style.backgroundImage = 'url("images/b-blue-ocean-5412.jpg")';
            break;

        case 'Thunderstorm':
        document.body.style.backgroundImage = 'url("images/lightning-sky-storm-53459.jpg")';
            break;

        case 'Snow':
        document.body.style.backgroundImage = 'url("images/abstract-art-background-289649.jpg")';
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weather-desc-header');
    let tempElement = document.getElementById('temp');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('wind-speed');
    let cityHeader = document.getElementById('city-header');
    let weatherIcon = document.getElementById('icon');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    tempElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

}

document.getElementById('search-btn').addEventListener('click', () => {
    let searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        searchWeather(searchTerm);
    }
})








// window.addEventListener("load", () => {
//     let long;
//     let lat;

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(async position => {
//             console.log(position);
//             console.log(error);
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             const proxy = 'http://cors-anywhere.herokuapp.com/';
//             const api = `${proxy}https://api.darksky.net/forecast/daced4d3d58ea11746d17d66c366545e/${lat},${long}`;

//             fetch(api)
//             .then(response => {
//                 return response.json();
//             })
//             .then(data => {
//                 console.log(data);
//             })
//         });
//     } else {
//         console.log('Error');
//     }
// });

