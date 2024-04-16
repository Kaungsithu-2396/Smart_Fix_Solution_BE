const nodemailer = require("nodemailer");

const sendMailToClient = async (toEmail, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: toEmail,
            subject,
            html: text,
        };
        await transporter.sendMail(mailOptions);
        console.log("Mail transfer success");
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = sendMailToClient;
