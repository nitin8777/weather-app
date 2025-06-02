document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "5cf5f1b15a9dbcc93677b2a768ce33bb";
    getWeatherBtn.addEventListener(`click`, async () => {
        const city = cityInput.value.trim();
        if (!city) return;
        try {
            const weatherdata = await fetchWeatherData(city)
            displayweatherData(weatherdata);
        } catch (error) {
            showError();
        }

    })
    async function fetchWeatherData(city) {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
            const response = await fetch(url);
          
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            return data;
            
        }
        async function displayweatherData(weatherdata) {
        console.log("DATA", weatherdata);
            const { name, main, weather } = weatherdata;
            cityNameDisplay.textContent = name;
            temperatureDisplay.textContent = `${Math.round(main.temp)}°C`;
            descriptionDisplay.textContent = weather[0].description;    
            weatherInfo.classList.remove("hidden");
            errorMessage.classList.add("hidden");
        
}


function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
}
});