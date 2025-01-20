const apiKey = "c1b136f572840484165220101203b4e3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener("click", function() {
    CheckWeather(searchBox.value);
});

async function CheckWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if(response.status === 404) {
            document.querySelector(".city_name_error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
    
            document.querySelector(".City").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            if(data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png"
            } 
                else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png"
            } 
                else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png"
            } 
                else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png"
            } 
                else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png"
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".city_name_error").style.display = "none";
        }
    
    } catch(error) {
        console.error(error);
        alert("City not found or missing data");
    }
    
}

