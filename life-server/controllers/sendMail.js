const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const { CLIENT_ID, CLIENT_SECRET, USER_EMAIL, REFRESH_TOKEN, REDIRECT_URI } = process.env;

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const sendEmail = async (to, url, title, buttonText) => {
	oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
	try {
		const accessToken = await oauth2Client.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: USER_EMAIL,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});
		let info = await transporter.sendMail({
			from: '"Admin South" <vhnvohoainam@gmail.com>', // sender address
			to: to, // list of receivers
			text: "Hi", // plain text body
			subject: title,
			html: `
            <div style="max-width: 700px; margin:40px auto; border: 1px solid #ddd; padding: 30px 20px; font-size: 110%; border-radius: 10px;background: #f4fdff">
            <h2 style="text-align: center; text-transform: uppercase;color: #3b3b3b;
			font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji;">WELCOME TO SOUTH</h2>
            <a href=${url} style="background: #4bbfe5; text-decoration: none;
    		font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,apple color emoji,segoe ui emoji,Segoe UI Symbol,noto color emoji; color: white; padding: 10px 20px; margin: 10px auto; display: block; border-radius: 8px; width: 240px; text-align: center;">${buttonText}</a>
            </div>
            `,
		});
		console.log(info);
	} catch (error) {
		console.log(error);
	}
};
module.exports = sendEmail;
