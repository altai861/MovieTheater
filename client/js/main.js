import '../css/style.css'

const customerId = localStorage.getItem("customerId");
const logoutButton = document.querySelector("#logout-button")
logoutButton.addEventListener("click", logOut)

validateAuth(customerId)

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
    window.location.replace("/html/login.html")
}