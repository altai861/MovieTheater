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
                res.status(201).json({ customerId: recordset.recordset[0].customerId })
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

module.exports = {
    login, 
    register
}