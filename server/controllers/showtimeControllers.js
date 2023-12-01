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

module.exports = {
    getAllShowTimes
}