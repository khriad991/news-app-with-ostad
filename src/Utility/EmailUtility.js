import nodemailer from 'nodemailer'

export async function sendEmail(emailTo ,emailText,emailSubject){

    let transporter = nodemailer.createTransport({
        host :"mail.teamrabbil.com",
        port:25,
        secure:false,
        auth:{
            user:"info@teamrabbil.com",
            pass:"~sR4[bhaC[Qs"
        },
        tls:{
            rejectUnauthorized:false
        }
    })

    let mailOption = {
        from:"Next js News portal <info@teamrabbil.com>",
        to:emailTo,
        subject:emailSubject,
        text:emailText
    }
    return await  transporter.sendMail(mailOption)
}