//IMPORTS
const macchine = require('../data/macchine')
const connection = require('../database/db')
//CONTROLLERS (Salvo con le arrow function della variabile con i rispettivi nomi di ogni rotta)

//INDEX CONTROLLER
const index = (req, res) => {

    //SALVIAMO LA QUERY DA FARE AL DATABSE IN UNA VARIABILE
    const sqlQuery = 'SELECT * FROM posts'

    //RECUPERO LA MIA VARIABILE PER LA CONNESSIONE AL DATABASE E UTILIZZO IL METODO QUERY PER FARE DELLE RCIHIESTE AL DATABSE 
    connection.query(sqlQuery, (err, results) => { //PASSO UNA CALLBACK CON DUE PARAMETRI: ERR CHE SARà UN OGGETTO CONTENTE L'ERRORE, E RESULTS NON SARà ALTRO CHE LA MIA TABELLA

        //INDICO UNA CONDIZIONE IN CASO L'ERRORE ESISTE E LO GESTISCO
        if (err) return res.status(500).json({ error: 'Errore interno nel database', status: 500 }) 

        //NON MI SERVE METTERE L'ELSE PERCHE' HO CHIUSO LA CONDIZIONE CON IL RETURN E IMPOSTA LA RES DELLA MIA API UGUALE ALLA TABELLA PARSATE IN JSON
        res.json(results)
    })



}

//STORE CONTROLLER
const store = (req, res) => {

    console.log('Sei nella rotta STORE')
    console.log(req.body) //LOG DELLA RICHIEST DEL BODY

    //SIMULIAMO L'ASSEGNAZIONE DELL'ID DELLA RISORSA ASSEGNANDO QUESTO VALORE ALLA VARIABILE:
    const newId = macchine.at(-1).id + 1  //PRENDI L'ID DELL'ULTIMO DELL'ULTIMO ELEMENTO DELL'ARRAY E AGGIUNGICI 1
    const { marca, modello, cavalli, prezzo, tag } = req.body //DESTRUTTURO LA IL BODY DELLA MIA RICHIESTA 

    const newCar = { //IN UNA NUOVA VARIABILE SALVO LA MIA NUOVA RISORSA 
        id: newId,
        marca,
        modello,
        cavalli,
        prezzo,
        tag
    }
    macchine.push(newCar) //PUSHO LA NUOVA RISORSA
    res.json(newCar)
}

//SHOW CONTROLLER
const show = (req, res) => {
    const id = parseInt(req.params.id) //TRASFORMO IN UN NUMERO LA STRINGA
    console.log('Sei nella rotta SHOW')
    const macchina = macchine.find(macchina => macchina.id === id) //TRAMITE IL FIND SALVO IN UNA VARIABILE SOLO LA RISORSA CHE HA L'ID UGUALE AL PARAMETRO DINAMICO
    if (!macchina) { //SE IL PARAMETRO DINAMICO NON è PRESENTE

        res.status(404) //RESTITUSICO L'ERRORE
        console.log('ERRORE: Macchina non trovata');
        return res.json(
            {
                status: 404,
                error: 'Macchina non trovata'
            }
        )
    }

    res.send(macchina) //ALTRIMENTI RESITTUISCO L'ELEMENTO CERCATO
}

//UPDATE CONTROLLER
const update = (req, res) => {
    //APPLICO LA STESSA LOGICA DELLA ROTTA SHOW
    console.log('Sei nella rotta UPDATE')
    const id = parseInt(req.params.id)
    const { marca, modello, cavalli, prezzo, tag } = req.body
    const macchina = macchine.find(macchina => macchina.id === id)

    if (!macchina) {
        res.status(404)

        return res.json({
            status: 404,
            error: 'Nessuna macchina da aggiornare'
        })
    }
    //SOSTITUISCO LE CHIAVI VALORE DELL'ELEMENTO SELEZIONATO CON QUELLE INVIATE NEL CORPO DELLA RICHIESTA 
    macchina.marca = marca
    macchina.modello = modello
    macchina.cavalli = cavalli
    macchina.prezzo = prezzo
    macchina.tag = tag

    console.log(macchine);

    res.json(macchina)
}

//MODIFY CONTROLLER
const modify = (req, res) => {
    console.log('Sei nella rotta MODIFY')
    const id = parseInt(req.params.id)

    res.send(`Sta aggiorando UNA PARTE della risorsa ${id}`)

}


//DESTROY CONTROLLER

const destroy = (req, res) => {
    
    //SALVO IL PARAMETRO DINAMICO DELL'UTENTE
    const id = parseInt(req.params.id)

    //SALVO LA MIA QUERY AL DATABASE CON IL SEGANPOSTO
    const sqlQuery = 'DELETE FROM posts WHERE id = ?'

    connection.query(sqlQuery, [id], (err, results) => {

        //GESTISCO L'ERRORE LATO SERVER
        if (err) return res.status(500).json({error: 'Errore nel database', status: 500})
        /* console.log(results); */
        
        //GESTISCO L'ERRORE LATO CLIENT
        if (results.length == 0) return res.status(404).json({ error: 'Nessun post da eliminare', status: 404 })
        
        //SE NON ENTRA NELLE DUE CONDIZIONI RESTIUTISCO LO STATUS CORRETTO
        res.sendStatus(204)
    })
    

}


//EXPORTS
module.exports = { index, show, store, update, modify, destroy } //ESPORTO IL TUTTO COME UN'OGGETTO CON LA SINTASSI ES6