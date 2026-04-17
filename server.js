//IMPORTS
const express = require('express')
const { log } = require('node:console')
const app = express()
const port = 3000
const postsRouter = require("./routers/posts")
const serverError = require("./middlewares/serverError")
const clientError = require("./middlewares/clientError")
const conn = require('./database/db')


app.use(express.json()) //MIDDLEWARE PER EFFETTUARE IL PARSING DEL REQUEST BODY




//ENTRY POINT
app.get('/', (req, res) => { //ROUTER DEI MIEI POST
  
  //ELEMENTO PER SCATENARE UN ERRORE LATO SERVER
  //provaerrore 
  //console.log(provaerrore);
  
  res.send('Sei nel server dei post!')
})


//POSTS CRUD
app.use("/macchine", postsRouter) //Router che contiene le CRUD dei miei post, tutte le rotte dentro 'postRouter' iniziano con '/macchine'




app.listen(port, () => { //Metodo per mettere il server il ascolto
  console.log(`Example app listening on port ${port}`)
})


app.use(serverError) //TRAMITE APP USE MI RICHIAMO LA CUSTOM MIDDLEWARE PER GESTIRMI L'ERRORE LATO SERVER

app.use(clientError) //TRAMITE APP USE MI RICHIAMO LA CUSTOM MIDDLEWARE PER GESTIRMI L'ERRORE 404