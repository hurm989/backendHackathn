const router = require("express").Router();
const { User } = require("../model/userModel")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const jsonWebToken = require("jsonwebtoken")

router.post("/", async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        // console.log("error")
        const user = await User.findOne({ email: email })

        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" })
        // console.log(user.password)

        const validPassword = await bcrypt.compare(password, user.password)
        // console.log(validPassword)

        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" })
        // const token = await user.generateAuthToken()

        //NAHE HORHA TOKEN

        res.status(200).send({ data: user, message: "Logged In successfuly" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})






const validate = (data) => {
    const schema = Joi.object({
        // userName: Joi.string().label("userName"),
        email: Joi.string().required().label("email"),
        password: Joi.string().required().label("password")
    })
    return schema.validate(data)
}

module.exports = router