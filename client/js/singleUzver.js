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

async function renderBuyTicket(uzverId) {
    const buyTicketDiv = document.querySelector(".buy-ticket");

    let rows, cols, boughtSeats, endDate, startTime;

    await axios.get(`http://localhost:3500/tickets/${uzverId}`)
    .then((response) => {
        console.log(response.data);
        rows = response.data.uzveruud[0].screenRows
        cols = response.data.uzveruud[0].screenColumns
        endDate = response.data.uzveruud[0].uzverDateEnd
        startTime = response.data.uzveruud[0].startTime
        boughtSeats = response.data.tickets.map(obj => obj.suudliinDugaar)
    })
    .catch((error) => {
        console.log(error)
    })

    console.log(cols, rows)
    console.log(boughtSeats)

    initializeSeatChooser(rows, cols, boughtSeats)
    initializeDateChooser(endDate, startTime)
    
    document.getElementById('ticket-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedSeats = Array.from(document.querySelectorAll('.selected')).map(td => td.textContent);
        const date = document.querySelector("#choose-date").value

        if (date.trim() === "") {
            alert("Үзвэр үзэх өдрөө сонгоно уу")
        }
        if (selectedSeats.length === 0) {
            alert('Суудал сонгоно уу')
        }

        console.log('Selected seats: ', selectedSeats)
        console.log(date)
    })
}

function initializeDateChooser(endDate, startTime) {
    const dateInput = document.getElementById("choose-date");
    let maxDate, minDate;
    console.log(endDate, startTime)
    const currentTimeHours = new Date().getHours();
    const currentTimeMinutes = new Date().getMinutes();

    const startT = new Date(startTime)
    const startTimeHours = startT.getHours();
    const startTimeMinutes = startT.getMinutes();
    let today = new Date()

    if (currentTimeHours > startTimeHours || (currentTimeHours === startTimeHours && currentTimeMinutes >= startTimeMinutes)) {

        today.setDate(today.getDate() + 1)
        const endD = new Date(endDate);
        maxDate = endD.toISOString().split('T')[0];
        minDate = today.toISOString().split('T')[0];
        console.log('The start time is in the future.');
    } else {
        console.log('The start time has passed.');
        const endD = new Date(endDate);
        maxDate = endD.toISOString().split('T')[0];
        minDate = today.toISOString().split('T')[0];
    }

    dateInput.min = minDate
    dateInput.max = maxDate
}

function initializeSeatChooser(rows, cols, boughtSeats) {
    const seatChooser = document.getElementById('seatChooser');

    for (let row = 1; row <= rows; row++) {
        const tr = document.createElement('tr');
        for (let col = 1; col <= cols; col++) {
            const td = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = 'checkbox';
            checkbox.name = 'selectedSeats';
            checkbox.value = `${(row - 1) * cols + col}`;
            td.appendChild(checkbox);
            td.textContent = `${(row - 1) * cols + col}`;
            td.setAttribute('data-row', row);
            td.setAttribute('data-col', col);


            if (boughtSeats.includes((row - 1) * cols + col)) {
                td.classList.add('disabled');
                td.setAttribute('title', 'This seat is disabled');
                checkbox.disabled = true
            } else {
                td.addEventListener('click', toggleSeat)
            }

            tr.appendChild(td)
        }
        seatChooser.appendChild(tr)
    }
}

function toggleSeat() {
    this.classList.toggle('selected')
}

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
        // Here I will add the ticket UI
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

