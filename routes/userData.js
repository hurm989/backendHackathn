const express = require("express")
const app = express()
const { route } = require("express")
const router = express.Router();
const detailsModel = require("../model/userDataModel.js");


router.get("/", (req, res) => {
    detailsModel.find({}, (err, result) => {
        if (err) {
            res.send(err).status(400)

        } else {
            res.send(result).status(200)
        }
    })
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    detailsModel.find({ _id: id }, (err, result) => {
        if (err) {
            res.send(err).status(400)
        } else {
            res.send(result).status(200)
        }
    })
})


router.post("/", (req, res) => {
    const { hotelName, rooms, days, extras, contactName, contact, image, amount, discription } = req.body
    let arr = []
    if (!hotelName) {
        arr.push("Hotel name is required")
    }
    if (!rooms) {
        arr.push("Room required")
    }
    if (!amount) {
        arr.push("Amount required")
    }
    if (!contact) {
        arr.push("Contact required")
    }
    if (arr && arr.length > 0) {
        res.send(arr).status(400)
        return
    }
    let obj = new detailsModel({
        hotelName, rooms, days, extras, contactName, contact, image, amount, discription,
        createdAt: new Date()
    })
    obj.save((err, result) => {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(result).status(200);
        }
    });
})
router.post("/:id", (req, res) => {
    const { hotelName, rooms, days, extras, contactName, contact, image, amount, discription } = req.body
    const id = req.params.id
    let arr = []
    if (!hotelName) {
        arr.push("Hotel name is required")
    }
    if (!rooms) {
        arr.push("Room required")
    }
    if (!amount) {
        arr.push("Amount required")
    }
    if (!contact) {
        arr.push("Contact required")
    }
    if (arr && arr.length > 0) {
        res.send(arr).status(400)
        return
    }
    let obj = new detailsModel({
        hotelName, rooms, days, extras, contactName, contact, image, amount, discription,
        createdAt: new Date(), id: id
    })
    obj.save((err, result) => {
        if (err) {
            res.send(err).status(404);
        } else {
            res.send(result).status(200);
        }
    });
})

router.put("/:id", (req, res) => {
    let { hotelName, rooms, days, extras, contactName, contact, image, amount, discription } = req.body
    let id = req.params.id
    let obj = {
        hotelName, rooms, days, extras, contactName, contact, image, amount, discription,
        createdAt: new Date()
    }
    detailsModel.findByIdAndUpdate(id, obj, (err, result) => {
        if (err) {
            res.send(err).status(400)

        } else {
            res.send(result).status(200)
        }
    })
})

router.delete("/:id", (req, res) => {
    let id = req.params.id
    detailsModel.findOneAndDelete({ _id: id }, (err, result) => {
        if (err) {
            res.send(err).status(400)
        } else {
            res.send(result).status(200)
        }
    })
})

router.delete("/", (req, res) => {
    detailsModel.deleteMany({}, (err, result) => {
        if (err) {
            res.send(err).status(400)
        } else {
            res.send(result).status(200)
        }
    })
})
module.exports = router;