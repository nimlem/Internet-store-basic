const { Device, BasketDevice, Basket } = require("../models/models")

class BasketController {


    async addToBasket(req, res, next) {
        const user = req.user
        const { deviceId } = req.body
        const basket = await BasketDevice.create({ basketId: user.id, deviceId: deviceId })
        return res.json(basket)
    }

    async getBasketUser(req, res) {
        const { id } = req.user
        const basket = await BasketDevice.findAll({
            include: {
                model: Device
            }, where: { basketId: id }
        })

        return res.json(basket)
    }

    async removeFromBasket(req, res) {
        const user = req.user
        const { deviceId } = req.params
        const basket = await BasketDevice.destroy({
            where: {
                basketId: user.id,
                deviceId: deviceId
            }

        })

        return res.json(basket)
    }


    async removeBasket(req, res) {
       
        const user = req.user
        const basket = await BasketDevice.destroy({
            where: {
                basketId: user.id,
                
            }

        })

        return res.json(basket)
    }



}

module.exports = new BasketController()