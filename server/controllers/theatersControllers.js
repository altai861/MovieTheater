const sql = require("mssql")

const getAllTheaters = (req, res) => {
    var request = new sql.Request()

    request.query("select * from theaters", function (err, recordset) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Database query error" })
        }
        else {
            res.json(recordset.recordset)
        }
    })
}

module.exports = {
    getAllTheaters
}