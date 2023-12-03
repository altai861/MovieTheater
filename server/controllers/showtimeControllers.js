const sql = require("mssql")

const getAllShowTimes = (req, res) => {
    var request = new sql.Request()

    request.query(`select * from uzveruud 
    join movies on movies.movieId = uzveruud.movieId
    join theaters on theaters.theaterId = uzveruud.theaterId
    where GETDATE() between uzveruud.uzverDateStart and uzveruud.uzverDateEnd`, 
    (err, recordset) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.json(recordset.recordset);
        }
    })
}

const getSingleShowtime = (req, res) => {

    const uzverId = req.params.uzverId
    var request = new sql.Request();

    request.query(`select * from uzveruud 
    join movies on movies.movieId = uzveruud.movieId
    join theaters on theaters.theaterId = uzveruud.theaterId
    where uzveruud.uzverId = ${uzverId}`, 
    (err, recordset) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.json(recordset.recordset);
        }
    })
}

const checkTicket = (req, res) => {
    const uzverId = req.params.uzverId
    const customerId = req.params.customerId

    var request = new sql.Request();

    request.query(`select * from tickets
    where uzverId=${uzverId} and customerId=${customerId}`, (err, recordset) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error" })
        } else {
            res.status(200).json(recordset.recordset)
        }
    })
}

module.exports = {
    getAllShowTimes,
    getSingleShowtime,
    checkTicket
}