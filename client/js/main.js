import '../css/style.css'
import axios from 'axios';



document.addEventListener("DOMContentLoaded", () => {
  
  const app = document.getElementById("app");

  //authValidation
  const customerId = sessionStorage.getItem("customerId");
  validateAuth(customerId)

  //logout button
  const logoutButton = document.querySelector("#logout-button")
  logoutButton.addEventListener("click", logOut)

  //Hello text
  const username = sessionStorage.getItem("username");
  const hello_text = document.createElement("p");
  hello_text.innerText = `Hi, ${username}`;
  app.appendChild(hello_text)

  const showTimesDiv = document.createElement("div");
  showTimesDiv.classList = "showtimes"
  getShowtimes(showTimesDiv);
  app.appendChild(showTimesDiv)
})


function getBalance(userId) {
  axios.get(`http://localhost:3500/auth/balance/${userId}`)
  .then((response) => {
    console.log(response.data)
    document.getElementById("balance").innerHTML = "Танд байгаа мөнгө: " + response.data.balance;
  })
  .catch((response) => {
    console.error(response)
  })
}


function validateAuth(customerId) {
    if (customerId) {
      console.log(customerId);
      document.querySelector("body").style.display = "block";
      getBalance(customerId)
      return true
    } else {
      window.location.replace("/html/login.html");
      return false;
    }
}

function logOut() {
    localStorage.removeItem("customerId");
    localStorage.removeItem("username");
    window.location.replace("/html/login.html")
}

async function getShowtimes(div) {
  axios.get("http://localhost:3500/showtime")
  .then(function(response) {
    console.log(response.data);
    div.innerHTML = "";
    response.data.forEach(st => {
      const newST = document.createElement("div");
      newST.classList.add("st")
      const movieTitle = document.createElement("h2");
      const theater = document.createElement("p");
      const date = document.createElement("p");
      const time = document.createElement("p");
      const posterImage = document.createElement("img");

      theater.innerText = st.theaterName;
      movieTitle.innerText = st.title
      date.innerText = st.uzverDateStart.split("T")[0] + " - " + st.uzverDateEnd.split("T")[0]
      time.innerText = st.startTime.split("T")[1].substring(0,5) + " - " + st.endTime.split("T")[1].substring(0, 5)
      posterImage.src = st.posterPath ? `http://localhost:3500/posterImages/${st.posterPath}` : null
      posterImage.alt =  `${st.title} poster image` 
      posterImage.width = "300"


      newST.appendChild(movieTitle)
      newST.appendChild(posterImage)
      newST.appendChild(theater)
      newST.appendChild(date)
      newST.appendChild(time)
      div.appendChild(newST)

      newST.addEventListener("click", () => singleUzver(st.uzverId));
    })
  })
  .catch(function(error) {
    console.log(error)
  }) 
}


function singleUzver(uzverId) {
  console.log(uzverId);
  sessionStorage.setItem("uzverId", uzverId);

  window.location.href = "/html/singleUzver.html"
}