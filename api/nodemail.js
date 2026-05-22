import moment from "moment/moment";
let nodemailer = require('nodemailer')
console.log('first', process.env.EMAILID, process.env.WIN_PASS, process.env.LINUX_PASS, process.env.API_TEST)

const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: `${process.env.EMAILID}`,
        // App password for Gmail and window machine
        pass: `${process.env.WIN_PASS}`
        // ""
        // App Password for Linux server
        // pass: `${process.env.LINUX_PASS}`""
    }
});

export default async function handler(req, res) {
    const { method } = req;
    switch (method) {
        case "POST":
            try {
                const date = moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a')
                const clientIp = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
                    req.socket.remoteAddress;
                const emailSubject = 'New Enquiry through Vekratund Info Tech '
                const emailContent =
                    `Dear Admin, \n \n Details of the person contacted you are as follows \n
                  Name: ${req.body.name} \n
                  Mobile Number: ${req.body.mobileno} \n
                  Emaail of client : ${req.body.email} \n
                  Message : ${req.body.msg} \n
                  Date & Time :${date} \n
                  IP Address: ${clientIp} \n`
                console.log('first', emailContent)
                client.sendMail(
                    {
                        from: `Web Developer <${process.env.EMAILID}>`,
                        to: "prajubpatil@gmail.com,vakratundtech@gmail.com",
                        subject: emailSubject,
                        text: emailContent
                    }
                ).then(() => {
                    console.log('Nodr Email sent')
                    res.status(201).json({ success: true, data: "Email Sent" })
                })
                    .catch((error) => {
                        console.error(error)
                        res.status(400).json({ success: false });
                    })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}