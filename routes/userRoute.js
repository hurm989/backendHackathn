const router = require("express").Router()
const { User } = require("../model/userModel.js")
const bcrypt = require("bcrypt")
const Joi = require("joi")


router.post("/", async (req, res) => {
    const {email,password}=req.body
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ email: email })
        if (user)
            return res.status(409).send({ message: "User with given email exits" })
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(password, salt)
        await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "User Created Successfulyy" })
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

const validate = (data) => {
    const schema = Joi.object({
        userName: Joi.string().required().label("userName"),
        email: Joi.string().required().label("email"),
        password:Joi.string().required().label("password")
    })
    return schema.validate(data)
}

module.exports = router