require('dotenv').config()
const express = require("express");
const app = express();
const sql = require("mssql");
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logger")

var dbConnected = false

var config = {
    user: process.env.database_user,
    password: process.env.database_password,
    server: process.env.database_server,
    database: process.env.database_name,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(config, function (err) {
    if (err) {
        console.error("Error connecting to the database")
    } else {
        console.log("Connected to the database")
        dbConnected = true;
    }
})

/*
It checks database connection 
app.use(function (req, res, next) {
    if (dbConnected) {
        return next()
    } else {
        res.status(500).json({ error: "Database connectiion not established" })
    }
})
*/


const allowedOrigins = [
    'http://localhost:5173'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Allow the request
        } else {
          callback(new Error('Not allowed by CORS')); // Deny the request
        }
      },
}

app.use(logger);
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/auth", require('./routes/authRoutes.js'))
app.use("/showtime", require("./routes/showtimeRoutes.js"))

app.listen(3500, () => {
    console.log("Server is running on port 3500")
})