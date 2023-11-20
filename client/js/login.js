import axios from "axios";

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.querySelector("#username").value;
            const phonenumber = document.querySelector("#phonenumber").value;
            this.login(username, phonenumber);
        })
    }

    async login(username, phonenumber) {

        await axios.post("http://localhost:3500/auth/login", {
            username: username,
            phonenumber: phonenumber
        })
        .then(function(response) {
            localStorage.setItem("customerId", response.data.customerId)
            window.location.replace("/");
            console.log(response.data);
        })
        .catch(function(error) {
            if (error.response && error.response.status === 401) {
                alert("Either username or phonenumber is wrong");
            } else {
                // Handle other errors, such as network issues or server errors
                console.error('Error:', error);
            }
        })
       
            
    }

    
}

const form = document.querySelector('#login-form');
if (form) {
    const fields = ["username", "phonenumber"];
    const validator = new Login(form, fields);
}