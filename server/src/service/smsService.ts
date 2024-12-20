import axios from 'axios';
require('dotenv').config();

class SendSMS{
async sendSmS(recipients:string, message:string){
    const apiKey = process.env.API_TOKEN;
    const apiUrl = process.env.API_URL;

    try {
        const response = await axios.post(apiUrl, {
            auth_token: apiKey,
            to: recipients, 
            text: message,
        });

        console.log('SMS Sent:', response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.response?.data || error.message);
    }
}
}
export const sendSMS = new SendSMS();
