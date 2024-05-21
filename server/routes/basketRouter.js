const Router = require('express')
const router = new Router()

const basketController = require('../controllers/basketController')

// ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
const authMiddleware = require('../middleware/authMiddleware')

// ------- CRUD корзины ------- //
router.post('/', authMiddleware , basketController.addToBasket)
router.get('/', authMiddleware , basketController.getBasketUser)
router.delete('/:deviceId', authMiddleware , basketController.removeFromBasket)
router.delete('/', authMiddleware , basketController.removeBasket)






module.exports = router