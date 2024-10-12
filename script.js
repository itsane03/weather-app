document.getElementById('weather-btn').addEventListener('click', function () {
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert("Please enter a location!");
    }
});

function getWeatherData(city) {
    const apiKey = 'e6f1999a81d684fb603ae93caeda98a6';  
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found or something went wrong");
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error.message);
        });
}

function updateWeatherInfo(data) {
    console.log("Weather Data:", data);  

    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const location = document.getElementById('location');
    const weatherIcon = document.getElementById('weather-icon');

    if (data && data.main && data.weather) {
        temperature.innerHTML = `${Math.round(data.main.temp)} °<span>C</span>`;
        description.innerHTML = data.weather[0].description;
        location.innerHTML = `${data.name}, ${data.sys.country}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 
    } else {
        console.error("Unexpected response format:", data);
        alert("Unexpected response format from API");
    }
}
