//IMPORTS
const express = require('express')
const router = express.Router() //MIDDLEWARE PER 'ATTIVARE' IL ROUTER ED APPLICARE IL REFACTORING
const postsController = require('../controllers/postsController') //IMPOSTO IL MIO CONTROLLER CHE SI OCCUPERA' DELLA LOGICA IN OGNI RISPETTIVA ROTTA
const logInfo = require('../middlewares/logInfo')
router.use(logInfo)

//ESSENDO STATO ESPORTATO COME UN OGGETTO, USO LA DOT NOTATION PER SELEZIONARE LE CHIAVI VALORE CHE MI SERVONO PER OGNI ROTTA.

//INDEX
router.get('/', postsController.index )

//SHOW
router.get('/:id', postsController.show )

//STORE
router.post('/', postsController.store )

//UPDATE
router.put('/:id', postsController.update )

//MODIFY
router.patch('/:id', postsController.modify )

//DESTROY
router.delete('/:id', postsController.destroy )

module.exports = router;