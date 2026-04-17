//IMPORTS
const macchine = require('../data/macchine')

//CONTROLLERS (Salvo con le arrow function della variabile con i rispettivi nomi di ogni rotta)

//INDEX CONTROLLER
const index = (req, res) => {

    let filtredBytag = macchine //VARIABILE D'APPOGGIO CHE HA IL VALORE DELLA RISORSA 'BASE', NEL CASO VOLESSIMO FILTARE LA NOSTRA RICERCA TRAMITE QUERY STRING
    const tagQuery = req.query.tag //SALVO IN UNA VARIABILE LA IL VALORE DELLA QUERY 'TAG' CHE, TEORICAMENTE, L'UTENTE VUOLE VISITARE
    console.log('Sei nella rotta INDEX')

    if (tagQuery) { //SE LA QUERY TAG ESISTE

        //LA VARIABILE D'APPOGGIO ASSUEME IL VALORE DELLE MIA RISORSA FILTRATA OVVERO:
        filtredBytag = macchine.filter(macchina => macchina.tag.includes(tagQuery)) //RESTITUISCIMI SOLO IL GLI ELEMENTI DELL'ARRAY (CHE SONO OGGETTI) CHE HANNO IL VALORE (PARLIAMO DI STRINGE) 
        // DELLA CHIAVE 'TAG' UGUALE A QUELLO DELLA QUERY STRING 
        

    } else { //ALTRIMENTI 

        res.json(filtredBytag) //RESTITUSCI LA VARIABILE D'APPOGGIO CON IL VALORE DELLA RISORSA 'BASE'
    }


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
    console.log('Sei nella rotta DESTROY')
    //STESSA LOGICA DELLA ROTTA SHOW
    const id = parseInt(req.params.id)
    const macchina = macchine.find(macchina => macchina.id === id)
    if (!macchina) {
        res.status(404)
        res.send(
            {
                status: 404,
                error: 'Nessuna macchina da eliminare trovata'
            }
        )
    } else { //ALTRIMENTI
        //USO IL METODO SPLICE SUL MIO ARRAY CON LE RISORSE E DICO:
        macchine.splice(macchine.indexOf(macchina), 1) //PARTI DALL'ELEMENTO CON L'INDICE DELL'ELEMENTO SELEZIONATO CON IL PARAM. DINAMIOC E RIMUOVILO
        console.log(macchine);
        res.sendStatus(204)


    }

}


//EXPORTS
module.exports = { index, show, store, update, modify, destroy } //ESPORTO IL TUTTO COME UN'OGGETTO CON LA SINTASSI ES6