const Teacher = require("../models/teacher.models");
const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const { invitationMail } = require("../helper/mailHelper");



//* Create  Joy validation object -------------

const teacherValidationObject = Joi.object({
    name: Joi.string().min(4).max(20).required().messages({
        "string.base": "Name must be string",
        "string.min": "Name should contains atlist 4 characters",
        "string.max": "Name should contains maximum 20 charactors",
        "string.empty": "Name is mandatory"
    }),
    age: Joi.number().min(24).max(50).required().messages({
        "number.base": "age must be number",
        "number.min": "age should be greaterthan or equal 24 ",
        "number.max": "age should be maximum 50 ",
        "number.empty": "age is mandatory"
    }),
    gender: Joi.string().required().messages({
        "string.base": "gender must be string",
        "string.empty": "gender is mandatory"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "Email must be string",
        "string.empty": "Email is mandatory",
        "string.email": "Your input should be email"
    }),
    password: Joi.string().min(6).max(15).required().messages({
        "string.base": "password must be string",
        "string.min": "password should contains atlist 6 characters",
        "string.max": "password should contains maximum 15 charactors",
        "string.empty": "password is mandatory"
    })

})



let registerTeacher = async (req, res, next) => {
    try {

        let { name, email, password } = req.body

        // ?returns the document if condition satisfies else return null
        let isTeacherAvailable = await Teacher.findOne({ email });

        if (!isTeacherAvailable) {

            //* Send mail while registering.

            invitationMail(email, name)

            let teacher = await Teacher.create({ name, email, password })
            let dataTeacher = {
                name: teacher.name,
                email: teacher.email, createdAT: teacher.createdAT, updatedAt: teacher.updatedAt, _id: teacher._id
            }
            return res.status(201).json({ error: false, message: "Teacher added successfully", data: dataTeacher })
        }
        res.status(409).json({ error: true, message: "Teacher already exist" })
    }
    catch (err) {
        next(err)
    }
}

let loginTeacher = async (req, res, next) => {
    try {
        let { email, password } = req.body
        console.log(password)

        let isTeacherAvailable = await Teacher.findOne({ email })
        console.log(isTeacherAvailable);

        if (!isTeacherAvailable) {
            return res.status(404).json({ error: true, message: "No teacher found at given email" })
        }

        let hashedPassword = await isTeacherAvailable.compareMyPassword(password)

        if (hashedPassword) {
            return res.status(201).json({ error: false, message: "Login SuccessFull" })
        }

        else {
            return res.status(401).json({ error: true, message: "Invalid password" })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    registerTeacher,
    loginTeacher
}