const sql = require("mssql")

const getScreenTickets = (req, res) => {
    const { uzverId } = req.params;
    console.log(uzverId);
    let tickets;

    var request = new sql.Request();

    request.query(`SELECT * FROM tickets WHERE uzverId = ${uzverId}`, (err, recordset) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error on tickets" });
        } else {
            
            tickets = recordset.recordset;

            // Perform the second query inside the callback of the first query
            request.query(`
                SELECT * FROM uzveruud 
                JOIN screen ON screen.screenId = uzveruud.screenId
                WHERE uzveruud.uzverId = ${uzverId}`, (err, recordset) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Internal server error on fff" });
                } else {
                    // Combine the results and send the response
                    res.status(200).json({ uzveruud: recordset.recordset, tickets: tickets });
                }
            });
        }
    });
};

const addTickets = (req, res) => {
    const { userId, uzverId, suudliinDugaaruud, date, price } = req.body
    console.log(userId, uzverId, suudliinDugaaruud, date, price)
    var request = new sql.Request();
    
    const suudliinDugaaruudString  = suudliinDugaaruud.join(',');

    /* 
    suudliinDugaaruud.map((num) => {
        request.query(`insert into tickets values
        (${userId}, ${uzverId}, '${date}', ${num}, ${price})`, (err, recordset) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Internal error while inserting" })
            }
        })
    })
    */
    try{
        request.input('SeatNumbers', sql.NVarChar(sql.MAX), suudliinDugaaruudString)
        request.input('UserId', sql.Int, userId);
        request.input('ShowtimeId', sql.Int, uzverId);
        request.input('ReservationDate', sql.Date, date);
        request.input('ReservationPrice', sql.Float, price);

        const result = request.execute("ticketAvah");
        const resultCode = result.recordset[0].ResultCode
        const resultMes = result.recordset[0].ResultMessage;
        if (resultCode === 0) {
            res.status(200).json({ message: resultMes })
        } else {
            res.status(200).json({ message: resultMes })
        }

        res.status(200).json({ message: "Seats reserved successfully" });
    } catch(err) {
        res.status(500).json({ message: "Internal server error while inserting into tickets" });
    }
}

const getTicketsDate = (req, res) => {
    const { uzverId, date } = req.params
    console.log(uzverId, date)
    let tickets;

    var request = new sql.Request();

    request.query(`SELECT * FROM tickets WHERE uzverId = ${uzverId} and uzverDate = '${date}'`, (err, recordset) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error on tickets" });
        } else {
            
            tickets = recordset.recordset;

            // Perform the second query inside the callback of the first query
            request.query(`
                SELECT * FROM uzveruud 
                JOIN screen ON screen.screenId = uzveruud.screenId
                WHERE uzveruud.uzverId = ${uzverId}`, (err, recordset) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Internal server error on fff" });
                } else {
                    // Combine the results and send the response
                    res.status(200).json({ uzveruud: recordset.recordset, tickets: tickets });
                }
            });
        }
    });
}

module.exports = {
    getScreenTickets,
    addTickets,
    getTicketsDate
}