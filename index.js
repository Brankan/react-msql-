const express = require('express')
const mssql = require('mssql')

/**
 * Config
 */
const HTTP_PORT = 3000
const DB_LOGIN = 'root';             // login
const DB_PASSWORD = 'Haslo';    // passs
const DB_SERVER = 'localhost'           // adress db
const DB_NAME = 'Biblioteka';              // name db
const DB_URI = `mssql://${DB_LOGIN}:${DB_PASSWORD}@${DB_SERVER}/${DB_NAME}`
/*****************/

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/api/ksiazki', (request, response) => {
  mssql.query(`SELECT * FROM Ksiazki`)
    .then(result => {
      response.json(result.recordset)
    })
    .catch(err => {
      console.log('error -> ', err)
    })

})

app.post('/api/ksiazki', (request, response) => {
  mssql.query(`INSERT INTO Ksiazki VALUES ('${request.body.Tytul}', '${request.body.Kategoria}', '${request.body.dataUrodzenia}')`)
    .then(result => {
      response.json(result.recordset)
    })
    .catch(err => {
      console.log('Error -> ', err)
    })
})

app.delete('/api/ksiazki', (request, response) => {
  mssql.query(`DELETE FROM Ksiazki WHERE Id_Ksiazki = ${request.body.id}`)
    .then(result => {
      response.json(result.recordset)
    })
    .catch(err => {
      console.log('Error -> ', err)
    })
})

mssql.connect(DB_URI)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`App work : http://localhost:${HTTP_PORT}`)
    })
  })
  .catch(err => {
    console.error("Error -> ", err)
  })

