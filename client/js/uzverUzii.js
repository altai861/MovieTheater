import '../css/style.css'
import axios from 'axios';

const uzverId = sessionStorage.getItem("uzverId");
const suudliinDugaar = sessionStorage.getItem("suudliinDugaar");
const uzverDate = sessionStorage.getItem("uzverDate")
const userId = sessionStorage.getItem("customerId")

const uzverDiv = document.getElementById("uzver");

console.log(uzverId, suudliinDugaar, uzverDate, userId)
const today = new Date();
const udate = new Date(uzverDate)

const uyear = udate.getFullYear()
const tyear = today.getFullYear()

const umonth = udate.getMonth()
const tmonth = today.getMonth()

const uday = udate.getUTCDate()
const tday = today.getUTCDate()

const uhour = udate.getHours()
const thour = today.getHours()

const umin = udate.getMinutes()
const tmin = today.getMinutes()

console.log("Year: ", tyear, uyear)
console.log("Month: ", tmonth, umonth)
console.log("Day: ", tday, uday)
console.log("Hour: ", thour, uhour)
console.log("Min: ", tmin, umin)

if (uyear === tyear && umonth === tmonth && uday === tday) {
    console.log("today is the day")
    
    if (await checkTheTime(uzverId)) {
        console.log("Time has come")
        renderUzver()
    } else {
        console.log("time has not come")
        const message = document.createElement("p");
        message.innerHTML = "Таны үзвэр хараахан болоогүй байна."
        
        uzverDiv.appendChild(message)
        console.log("Таны үзвэр хараахан болоогүй байна.")
    }


} else {
    const message = document.createElement("p");
    message.innerHTML = "Таны үзвэр хараахан болоогүй байна."

    uzverDiv.appendChild(message)
    console.log("Таны үзвэр хараахан болоогүй байна.")
}

async function renderUzver() {

    // Now render the uzver.
    let source;
    await axios.get(`http://localhost:3500/showtime/${uzverId}`)
    .then(function(response) {
        console.log(response.data)
        source = response.data.moviePath
    })
    .catch(function(error) {
        console.error(error)
    }) 
    console.log("rendering uzver")
    let video = document.createElement("video");
    video.width = "800"
    video.controls = true
    let s = document.createElement("source");
    s.type = "video/mp4"

    if (source) {
        console.log(source)
        s.src = `http://localhost:3500/movies/${source}`
    } else {
        s.src = 'http://localhost:3500/movies/vegeta_speech.mp4'
        console.log("No source")
    }
    video.appendChild(s)
    uzverDiv.appendChild(video)
}


async function checkTheTime(uzverId) {
    let start, end;

    await axios.get(`http://localhost:3500/showtime/${uzverId}`)
    .then(function(response) {
        console.log(response.data)
        start = response.data[0].startTime
        end  = response.data[0].endTime
    })
    .catch(function(response) {
        console.error(response)
    })

    console.log(start, end)
    const startDate = new Date(start)
    const endDate = new Date(end)

    const currentDate = new Date();

  // Extract hours and minutes
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const startHours = startDate.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'UTC' });
    const startMinutes = startDate.toLocaleString('en-US', { minute: 'numeric', timeZone: 'UTC' });

    const endHours = endDate.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'UTC' });
    const endMinutes = endDate.toLocaleString('en-US', { minute: 'numeric', timeZone: 'UTC' });

    console.log(currentHours, currentMinutes);
    console.log(startHours, startMinutes)
    console.log(endHours, endMinutes)
    const now = currentHours * 60 + currentMinutes
    const s = Number(startHours) * 60 + Number(startMinutes)
    const e = Number(endHours) * 60 + Number(endMinutes)
    console.log(now, s, e)
    if (now >= s && now < e) {
        return true
    }
    else {
        return false
    }
}
