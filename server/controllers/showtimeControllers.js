const sql = require("mssql")

const getAllShowTimes = (req, res) => {
    var request = new sql.Request()

    request.query("select * from uzveruud join movies on uzveruud.movieId = movies.movieId join genres on movies.genreId = genres.genreId")
}