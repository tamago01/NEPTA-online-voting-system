import * as xlsx from 'xlsx';
import * as path from 'path';
import mongoose from 'mongoose';
import { User } from '../auth/auth.model';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config()

let usersList: Array<{
  name: string;
  email: string;
  phoneNumber: string;
  membershipNumber: string;
  membershipValidityDate: string;
  password: string;
  hasVoted: boolean;
}> = [];
let firstHalfUsersList: Array<{
  name: string;
  email: string;
  phoneNumber: string;
  membershipNumber: string;
  membershipValidityDate: string;
  password: string;
  hasVoted: boolean;
}> = [];

let secondHalfUsersList: Array<{
  name: string;
  email: string;
  phoneNumber: string;
  membershipNumber: string;
  membershipValidityDate: string;
  password: string;
  hasVoted: boolean;
}> = [];

function divideAndStoreUsers(usersList: Array<{
  name: string;
  email: string;
  phoneNumber: string;
  membershipNumber: string;
  membershipValidityDate: string;
  password: string;
  hasVoted: boolean;
}>) {
  const midIndex = Math.ceil(usersList.length / 2);
  
  firstHalfUsersList = usersList.slice(0, midIndex);
  secondHalfUsersList = usersList.slice(midIndex);

  console.log(`First half stored: ${firstHalfUsersList.length} users.`);
  console.log(`Second half stored: ${secondHalfUsersList.length} users.`);
}

console.log('First Half Users:', firstHalfUsersList);
console.log('Second Half Users:', secondHalfUsersList);

async function processExcel() {
  const filePath = path.join(__dirname, '../../data/send_email.xlsx');
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    type RowType = {
      Name: string;
      'Email Address': string;
      'Phone Number': string;
      'Membership Number': string;
      'Membership Validity Date': string;
    };

    for (const row of sheetData as RowType[]) {
      const {
        Name: name,
        'Email Address': email,
        'Phone Number': phoneNumber,
        'Membership Number': membershipNumber,
        'Membership Validity Date': membershipValidityDate,
      } = row;

      if (!email || !membershipNumber) {
        console.log(`Skipping row due to missing data: ${JSON.stringify(row)}`);
        continue;
      }

      const emailExists = usersList.some((user) => user.email === email);

      if (!emailExists) {
        const newUser = {
          name,
          email,
          phoneNumber: phoneNumber || "",
          membershipNumber,
          membershipValidityDate,
          password: "generateRandomPassword",
          hasVoted: false,
        };
        usersList.push(newUser);
      } else {
        console.log(`User with email ${email} already exists. Skipping.`);
      }
    }

    console.log('Excel file processed successfully.');
  } catch (error) {
    console.error('Error processing Excel file:', error);
  }
}


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  },
  pool: true, // Use pooled connections
  maxConnections: 3, // Limit concurrent connections
  rateDelta: 1000, // Minimum time between messages
  rateLimit: 3 //
});

async function sendEmailsToUsers(userList: Array<{
  name: string;
  email: string;
  phoneNumber: string;
  membershipNumber: string;
  membershipValidityDate: string;
  password: string;
  hasVoted: boolean;
}>) {
  for (const [index, user] of userList.entries()) {
    try {
      // Send email
      await sendEmailCitizenship(user.email, user.name,);

      console.log(`Email sent to ${user.email} (${index + 1}/${userList.length})`);

      // Delay for 1 second before sending the next email
      await new Promise((resolve) => setTimeout(resolve, 10000));
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
    }
  }
}

async function sendAllEmails() {
  console.log('Sending emails to the first half of users...');
  await sendEmailsToUsers(firstHalfUsersList);

  console.log('Sending emails to the second half of users...');
  await sendEmailsToUsers(secondHalfUsersList);

  console.log('All emails sent successfully!');
}
async function sendEmailCitizenship(email: string, name: string): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'NEPTA Election 2024 - Citizenship Verification',
    text: `Hello ${name},

Please fill the google form by clicking google link for cross verification and authenticity. Please provide your citizenship number/passport number with its photo. After cross verification valid members will receive Username and password till election day .

Google form link: https://forms.gle/r7L5JYxnu7Ve4Bor7

Thank you
Regards,
NEPTA Election Committee 2024
Bishwas Shrestha
Suraj Bhusal
Pravin Kumar Yadav`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
}


async function main() {

await processExcel();
divideAndStoreUsers(usersList);
await sendAllEmails();



  // await sendEmailForCitizenship()
  // await registerUsers();

}
main().catch((error) => console.error('Error in main execution:', error));

