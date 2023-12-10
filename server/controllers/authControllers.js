const sql = require("mssql")

const login = async (req, res) => {
    const { username, phonenumber } = req.body;
    if (!username || !phonenumber) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    var request = new sql.Request();

    request.query(`select * from customers where username='${username}' and phonenumber='${phonenumber}'`, function (err, recordset) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query error' });
        } else {
            if (recordset.recordset.length == 0) {
                res.status(401).json({ "message": "Login not successful" })
            } else {
                res.status(201).json({ customerId: recordset.recordset[0].customerId, 
                                        username: recordset.recordset[0].username })
            }
        }
    })
}

const register = async (req, res) => {
    const { username, email, phonenumber } = req.body;

    if (!username || !email || !phonenumber) return res.status(400).json({ message: "All fields are required" })

    try {
        var request = new sql.Request();

        request.query(`select * from customers where username='${username}'`, (err, recordset) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (recordset.recordset.length > 0) {
                    console.log(recordset.recordset)
                    return res.status(401).json({ message: "Duplicate username detected. Change your username" })
                } else {
                    const query = `
                        insert into customers (username, email, phonenumber)
                        values(@username, @email, @phonenumber)
                    `;

                    request.input('username', sql.NVarChar, username);
                    request.input('email', sql.NVarChar, email);
                    request.input('phonenumber', sql.NVarChar, phonenumber);

                    request.query(query);

                    return res.status(200).json({ message: "Registration successfull" })
                }
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

const balance = async (req, res) => {
    const userId = req.params.userId
    var request = new sql.Request();

    request.query(`select balance from customers where customerId = ${userId}`, (err, recordset) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: `Internal server error while getting the balance of user ${userId}` })
        } else {
            res.status(200).json(recordset.recordset[0])
        }
    })
}

module.exports = {
    login, 
    register,
    balance
}