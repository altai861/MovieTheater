import '../css/style.css'
import axios from 'axios'

document.addEventListener("DOMContentLoaded", () => {
    const uzverId = sessionStorage.getItem("uzverId")
    const userId = sessionStorage.getItem("userId");

    console.log(uzverId);
    const mainDiv = document.querySelector(".content");
    const p = document.createElement("p");
    p.innerText = uzverId;
    mainDiv.appendChild(p)

    getUzver(uzverId)
    
    renderUserTickets(uzverId, userId)

    renderBuyTicket(uzverId)
})


async function renderUserTickets(uzverId, userId) {
    let userTickets;
    const myTickets = document.querySelector(".my-tickets");

    await axios.get(`http://localhost:3500/showtime/${uzverId}/${userId}`)
    .then(function(response) {
        console.log(response.data)
        userTickets = response.data
    })
    .catch(function(err) {
        console.error(err) 
    })

    if (userTickets.length == 0) {
        const message = document.createElement("p");
        message.innerText = "Танд ticket алга байна.";

        myTickets.appendChild(message)
        
        console.log("no tickets")
    } else {
        console.log("you have tickets")
    }
}

function getUzver(id) {
    axios.get(`http://localhost:3500/showtime/${id}`)
    .then((response) => {
        console.log(response.data[0])
        renderUzver(response.data[0])
    })
    .catch((error) => {
        console.log(error)
    })
}

function renderUzver(uzver) {

    const title = document.getElementById("title");
    const poster = document.getElementById("poster");
    const genres = document.getElementById("genres");
    const desc = document.getElementById("desc");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    
    title.innerText = uzver.title
    poster.src = `http://localhost:3500/posterImages/${uzver.posterPath}`;
    poster.alt = `${uzver.title} poster image`;
    genres.innerHTML = `${uzver.genres.split(";")[0]}` + " " + `${uzver.genres.split(";")[1]}`
    desc.innerText = uzver.movieDescription
    date.innerText = uzver.uzverDateStart.split("T")[0] + " - " + uzver.uzverDateEnd.split("T")[0]
    time.innerText = uzver.startTime.split("T")[1].substring(0, 5) + " - " +  uzver.endTime.split("T")[1].substring(0, 5)
}

