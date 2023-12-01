import '../css/style.css'
import axios from 'axios';



document.addEventListener("DOMContentLoaded", () => {
  
  const app = document.getElementById("app");

  //authValidation
  const customerId = localStorage.getItem("customerId");
  validateAuth(customerId)

  //logout button
  const logoutButton = document.querySelector("#logout-button")
  logoutButton.addEventListener("click", logOut)

  //Hello text
  const username = localStorage.getItem("username");
  const hello_text = document.createElement("p");
  hello_text.innerText = `Hi, ${username}`;
  app.appendChild(hello_text)

  const showTimesDiv = document.createElement("div");
  getShowtimes(showTimesDiv);
  app.appendChild(showTimesDiv)
})



function validateAuth(customerId) {
    if (customerId) {
      console.log(customerId);
      document.querySelector("body").style.display = "block";
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
      newST.innerText = st.title
      div.appendChild(newST)
    })
  })
  .catch(function(error) {
    console.log(error)
  }) 
}
