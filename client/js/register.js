import axios from "axios";

class Register {
    constructor(form) {
        this.form = form;
        
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const phonenumber = document.getElementById("phonenumber").value;
            
            
            this.register(username, email, phonenumber);
        })
    }

    async register(username, email, phonenumber) {
        await axios.post("http://localhost:3500/auth/register", {
            username: username,
            email: email,
            phonenumber: phonenumber
        })
        .then(function(response) {
            console.log(response.data);
            alert("Your account created");
            window.location.replace("/login.html");
        })
        .catch(function(error) {
            if (error.response && error.response.status === 409) {
                alert("Duplicate username");
            } else {
                // Handle other errors, such as network issues or server errors
                console.error('Error:', error);
            }
        })
    }
}

const form = document.getElementById("register-form")
const register = new Register(form);