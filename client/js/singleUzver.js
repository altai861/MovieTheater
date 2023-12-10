import '../css/style.css'
import axios from 'axios'

document.addEventListener("DOMContentLoaded", () => {
    const uzverId = sessionStorage.getItem("uzverId")
    const userId = sessionStorage.getItem("customerId");

    console.log(uzverId);
    const mainDiv = document.querySelector(".content");
    const p = document.createElement("p");
    p.innerText = uzverId;
    mainDiv.appendChild(p)

    getUzver(uzverId)
    
    renderUserTickets(uzverId, userId)

    renderBuyTicket(uzverId, userId)
})

async function renderBuyTicket(uzverId, userId) {

    let rows, cols, boughtSeats, endDate, startTime, price;

    await axios.get(`http://localhost:3500/tickets/${uzverId}`)
    .then((response) => {
        console.log(response.data);
        rows = response.data.uzveruud[0].screenRows
        cols = response.data.uzveruud[0].screenColumns
        endDate = response.data.uzveruud[0].uzverDateEnd
        startTime = response.data.uzveruud[0].startTime
        price = response.data.uzveruud[0].price
        boughtSeats = response.data.tickets.map(obj => obj.suudliinDugaar)
    })
    .catch((error) => {
        console.log(error)
    })

    console.log(cols, rows)
    console.log(boughtSeats)

    //initializeSeatChooser(rows, cols, boughtSeats)
    initializeDateChooser(endDate, startTime, uzverId)
    
    document.getElementById('ticket-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedSeats = Array.from(document.querySelectorAll('.selected')).map(td => td.textContent);
        const date = document.querySelector("#choose-date").value

        if (date.trim() === "" || selectedSeats.length === 0) {
            alert("Үзвэр үзэх өдрөө сонгоно уу/Суудал сонгоно уу")
        } else {
            console.log('Selected seats: ', selectedSeats)
            console.log(date)
            const data = {
                userId: userId,
                uzverId: uzverId,
                suudliinDugaaruud: selectedSeats,
                date: date,
                price: price
            }
            axios.post('http://localhost:3500/tickets', data)
            .then(function(response) {
                console.log(response.data)
                location.reload()
            })
            .catch(function(error) {
                alert('Таны үлдэгдэл хүрэлцэхгүй байна.')
                setTimeout(2000);
                location.reload();
                console.error(error)
            })
        }

    })
}

async function initializeDateChooser(endDate, startTime, uzverId) {
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

    let rows, cols, boughtSeats;


    dateInput.addEventListener("change", (e) => {
        console.log(e.target.value)
        let value = e.target.value
        if (value.trim() !== "") {
            axios.get(`http://localhost:3500/tickets/${uzverId}/${value}`)
            .then(function(response) {
                console.log(response.data)
                rows = response.data.uzveruud[0].screenRows
                cols = response.data.uzveruud[0].screenColumns
                boughtSeats = response.data.tickets.map(obj => obj.suudliinDugaar)
                document.getElementById("seatChooser").innerHTML = ""
                initializeSeatChooser(rows, cols, boughtSeats)
            })
            .catch(function(err) {
                console.log(err)
            })
            initializeSeatChooser()
        } else {
            document.getElementById("seatChooser").innerHTML = ""
        }

    })
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
        console.log(userTickets)
        // Here I will add the ticket UI
        renderMyTickets(userTickets)
        console.log("you have tickets")
    }
}


function renderMyTickets(userTickets) {
    const myTicketsDiv = document.querySelector(".my-tickets");
    userTickets.map((ticket) => {
        const ticketDiv = document.createElement("div");
        ticketDiv.classList = "ticket"
        const suudliinDugaar = document.createElement("p");
        const date = document.createElement("p");

        suudliinDugaar.innerText = "Суудлын дугаар: " + ticket.suudliinDugaar;
        date.innerText = "Огноо: " + ticket.uzverDate.split("T")[0]

        ticketDiv.appendChild(suudliinDugaar);
        ticketDiv.appendChild(date)
        myTicketsDiv.appendChild(ticketDiv)

        ticketDiv.addEventListener("click", () => {
            console.log(ticket)
            if (ticket) {
                console.log(ticket.suudliinDugaar)
                console.log(ticket.uzverDate)
                sessionStorage.setItem("suudliinDugaar", String(ticket.suudliinDugaar));
                sessionStorage.setItem("uzverDate", String(ticket.uzverDate))
            }
            window.location.href = "/html/uzverUzii.html"
        })
    })
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

    const price = document.getElementById("price");
    
    title.innerText = uzver.title
    poster.src = `http://localhost:3500/posterImages/${uzver.posterPath}`;
    poster.alt = `${uzver.title} poster image`;
    genres.innerHTML = `${uzver.genres.split(";")[0]}` + " " + `${uzver.genres.split(";")[1]}`
    desc.innerText = uzver.movieDescription
    date.innerText = uzver.uzverDateStart.split("T")[0] + " - " + uzver.uzverDateEnd.split("T")[0]
    time.innerText = uzver.startTime.split("T")[1].substring(0, 5) + " - " +  uzver.endTime.split("T")[1].substring(0, 5)
    price.innerHTML = "Үнэ: " + uzver.price
}

