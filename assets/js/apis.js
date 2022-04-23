//-----Set Charlotte Astrological Data---------------
//https://ipgeolocation.io/documentation/astronomy-api.html
fetch(`https://api.ipgeolocation.io/astronomy?apiKey=3c8e3ad3bc4146dc906419930fe82cfd&&lat=35.22548&long=-80.841`)
.then(res => res.json())
.then (data => {       
    document.querySelector("#location").innerHTML = `Latitude: ${data.location.latitude.toFixed(3)} & Longitude: ${data.location.longitude}`
    document.querySelector("#sunrise").innerHTML = data.sunrise
    document.querySelector("#solarNoon").innerHTML = data.solar_noon
    document.querySelector("#sunset").innerHTML = data.sunset
    document.querySelector("#moonrise").innerHTML = data.moonrise
    document.querySelector("#dayLength").innerHTML = data.day_length
    document.querySelector("#moonset").innerHTML = data.moonset
    console.log("Charlotte Data Loaded")
})
.catch(err => {
    console.log(`error ${err}`)
})

//------------Mars Weather--------------
//https://maas2.apollorion.com
fetch(`https://api.maas2.apollorion.com/`)
.then(res => res.json())
.then (data => {      
    document.querySelector("#marsWeather").innerHTML = `Weather on Mars`
    document.querySelector("#atmoOpacity").innerHTML = `Current Weather: ${data.atmo_opacity}`
    document.querySelector("#minTemp").innerHTML = `Min temp: ${data.min_temp}c`
    document.querySelector("#maxTemp").innerHTML = `Max temp: ${data.max_temp}c`
    document.querySelector("#season").innerHTML = `Current Season: ${data.season}`
    document.querySelector("#sunriseMars").innerHTML = `Sunrise: ${data.sunrise}`
    document.querySelector("#sunsetMars").innerHTML = `Sunset: ${data.sunset}`
    console.log("Mars Weather Loaded")
})
.catch(err => {
    console.log(`error ${err}`)
})