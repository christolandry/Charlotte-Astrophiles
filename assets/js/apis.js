//-----Set Charlotte Astrological Data---------------
//https://ipgeolocation.io/documentation/astronomy-api.html
console.log("Charlotte data called")
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
    console.log("Charlotte data loaded")
})
.catch(err => {
    console.log(`error ${err}`)
})

//------------Mars Weather--------------
//https://maas2.apollorion.com
console.log("Mars Weather Called")
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
    console.log("Mars Weather loaded")
})
.catch(err => {
    console.log(`error ${err}`)
})

//-------------------Refresh Mars Picture-----------------
document.querySelector("#marsRefresh").addEventListener('click', () => pictureRefresh("mars"))
document.querySelector("#hubbleRefresh").addEventListener('click', () => pictureRefresh("hubble"))
function pictureRefresh(pic){
    console.log("-------------")
    var $spotlights = $(`.spotlight#${pic}`);

    $spotlights
        ._parallax()
        .each(function() {

            var $this = $(this),
                on;

            on = function() {         
                
                document.querySelector(`#${pic}Title`).innerHTML = "Loading new photo...."
                document.querySelector(`#${pic}SubTitle`).innerHTML = ""
                if(pic === "hubble") document.querySelector(`#hubbleInfo`).innerHTML = ""
                
                if($this.find('.image.main > img#marsPic').length && pic === "mars"){
                    //element two ------Picures of Mars from Curiosity--------
                    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KtlSFp9zsFZPcR50w1UX0I3D1bWz0xf1yC2gZTgI")
                    .then(res => res.json())
                    .then (data => {
                        let photo = data.photos[Math.floor(Math.random() * data.photos.length)]                       
                        $this.css('background-image', 'url("' + photo.img_src + '")');
                        document.querySelector("#marsTitle").innerHTML = `A shot of Mars from the ${photo.rover.name} rover`
                        document.querySelector("#marsSubTitle").innerHTML = `This photo as taken on ${photo.earth_date} from the ${photo.camera.full_name}`
                        console.log("Mars Picture Refreshed")
                    })
                    .catch(err => {
                        console.log(`error ${err}`)
                    })
                }else if($this.find('.image.main > img#hubblePic').length && pic === "hubble"){
                    //element three ------Hubble Telescope keyword: nebula--------
                    fetch(`https://hubblesite.azurewebsites.net/images/tags/nebula`)
                    .then(res => res.json())
                    .then (data => {       
                        let photo = 0, maxRes = 0, i = 0;
                        while(maxRes < 2000){
                            photo = data[Math.floor(Math.random() * data.length)]     
                            for (i = 0; i < photo.imgWithRes.length; i++){
                                if(photo.imgWithRes[i][1].split(" ")[0] >= 2000) maxRes = photo.imgWithRes[i][1].split(" ")[0]
                                break
                            }
                            $this.css('background-image', 'url("' + photo.imgWithRes[i][0] + '")');
                            document.querySelector("#hubbleTitle").innerHTML = photo.title
                            document.querySelector("#hubbleSubTitle").innerHTML = photo.date
                            document.querySelector("#hubbleInfo").innerHTML = photo.info.slice(0, Math.min(500, photo.info.length)).concat("....")
                            console.log("Nebula Picture Refreshed")              
                        }
                    })
                    .catch(err => {
                        console.log(`error ${err}`)
                    })
                }
            };
            breakpoints.on('>medium', on);
        });
}