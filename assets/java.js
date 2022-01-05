var apiKey = "100e8a177462a5e3756705e80549a706"
var searchBtn = document.getElementById("search")

function mainSearch() {
    var city = document.getElementById("inputData").value
    searchCity(city)
}

function searchCity(city) {

    var urlCurrentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"

    fetch(urlCurrentWeather)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data.main.temp)
            var newRow = document.createElement("div")
            newRow.setAttribute("class", "row")

            document.getElementById("cityName", "date").textContent = data.name
            document.getElementById("temp").textContent = data.main.temp + " " + "F"
            document.getElementById("wind").textContent = data.wind.speed + " " + "MPH"
            document.getElementById("humid").textContent = data.main.humidity + " " + "%"
        })

    var urlFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial"

    fetch(urlFiveDay)
        .then(response => response.json())
        .then(data => {
            console.log(data)
      

                
            var noonArr = data.list.filter(index => index.dt_txt.includes("12:00"))
            console.log(noonArr)

            var forecastContainer = document.querySelector(".forecast")
            forecastContainer.innerHTML = "";

            var newRow = document.createElement("div")
            newRow.setAttribute("class", "row")
            for (i = 0; i < noonArr.length; i++) {
            
                var newCardCont = document.createElement("div")
                newCardCont.setAttribute("class", "card col mr-1 bg-dark text-white")

                var newCardBody = document.createElement("div")
                newCardBody.setAttribute("class", "card-body")

                var newCardTitle = document.createElement("h5")
                newCardTitle.setAttribute("class", "card-title")
                newCardTitle.textContent = noonArr[i].main.temp + ' ' + "F"

                var newCardWind = document.createElement("p")
                newCardWind.setAttribute("class", "card-text")
                newCardWind.textContent = noonArr[i].wind.speed + ' ' + "mph"

                var newCardhumidity = document.createElement("p")
                newCardhumidity.setAttribute("class", "card-text")
                newCardhumidity.textContent = noonArr[i].main.humidity + ' ' + "%"

                var newCardDate = document.createElement("p")
                newCardDate.setAttribute("class", "card-text")
                newCardDate.textContent = noonArr[i].dt_txt.split(" ")[0]

                newCardBody.appendChild(newCardDate)
                newCardBody.appendChild(newCardTitle)
                newCardBody.appendChild(newCardWind)
                newCardBody.appendChild(newCardhumidity)
                newCardCont.appendChild(newCardBody)
                newRow.appendChild(newCardCont)
            }
            forecastContainer.appendChild(newRow)
        })
}

searchBtn.addEventListener("click", mainSearch)