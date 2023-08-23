const nodemailer = require('nodemailer');

let invitationMail = async (email, name) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "sanjumaiti.maligram@gmail.com",
            pass: "iihgjyrblrnfndpq"
        }
    })
    transporter.sendMail({
        from: "sanjumaiti.maligram@gmail.com",
        to: email,
        subject: "Invitational Mail ",
        text: "Thanks for registering with us",
        html: `<h1> Thanks for Registering ${name} Please Visit Again  </h1>`
    }, () => {
        console.log("Mail sent successfully")
    })
}



module.exports ={
    invitationMail
}