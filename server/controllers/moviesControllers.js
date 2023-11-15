const sql = require("mssql")

const getAllMovies = (req, res) => {
    var request = new sql.Request()
    request.query(
        `select * from movies 
        join genre on movies.genreId = genre.genreId
        join secondgenre on movies.genreIdAlt = secondgenre.genreId`
        , function (err, recordset) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database query error' })
        } else {
            res.json(recordset.recordset)
        }
    })
}

/*

I will do it later, it is now not so necessary

const addMovies = (req, res) => {
    const { theaterId,  } = req.body
    if (!theaterId) return res.status(401).json({ message: 'Only theaters can add movies' })
}

*/

module.exports = {
    getAllMovies
}