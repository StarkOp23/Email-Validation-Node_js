const express = require('express')
const { registerTeacher, loginTeacher } = require("../controller/teacher.controller")

let router = express.Router();

router.post("/addteacher", registerTeacher);
router.post("/loginteacher", loginTeacher)


module.exports = router;