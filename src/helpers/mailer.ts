import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {

    console.log("email", email);
    console.log("emailType", emailType);
    console.log("typeof emailType", typeof emailType);
    console.log("userId", userId);

    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        // Note: store verifyToken,verifyTokenExpiry to database and 
        // Note: send this information to user by mail.
        // Note: when user click button (UI) then pass the verifyToken to body.

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { $set: { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 } })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } })
        }

        // var transport = nodemailer.createTransport({
        //     host: "sandbox.smtp.mailtrap.io",
        //     port: 2525,
        //     auth: {
        //         user: 'swarnalighosh225@gmail.com',
        //         pass: 'logx ycac rahn utxe'
        //     }
        // });

        var transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'swarnalighosh225@gmail.com',
                pass: 'logx ycac rahn utxe'
            }
        });



        const mailOptions = {
            from: 'swarnalighosh225@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}