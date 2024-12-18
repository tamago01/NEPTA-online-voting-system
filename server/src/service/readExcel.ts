import * as xlsx from 'xlsx';
import * as path from 'path';
import mongoose from 'mongoose';
import { User } from '../auth/auth.model';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
let usersList: Array<{
  name: string;
  email: string;
  phoneNumber: string;
  membershipNumber: string;
  membershipValidityDate: string;
  password: string;
  hasVoted: boolean;
}> = [];

// MongoDB Connection Function
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 60000,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

async function processExcel() {
  const filePath = path.join(__dirname, '../../data/demo.xlsx');
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
          password: generateRandomPassword(),
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

async function registerUsers() {
  try {
    if (usersList.length === 0) {
      console.log('No users to register.');
      return;
    }

    const usersToInsert = usersList.map((user) => ({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      membershipNumber: user.membershipNumber,
      membershipValidityDate: user.membershipValidityDate,
      password: user.password,
      hasVoted: user.hasVoted,
    }));

    const insertedUsers = await User.insertMany(usersToInsert);
    console.log(`${insertedUsers.length} users have been successfully registered.`);
    console.log('Sending registration emails...');
    insertedUsers.forEach((user) => sendEmail(user.email, user.password));
    
  } catch (error) {
    console.error('Error registering users in the database:', error);
  }
}

// Function to Generate a Random Password
function generateRandomPassword(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('');
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
});

async function sendEmail(email: string, password: string): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Account Registration Details',
    text: `Hello,

Your account has been successfully registered. Below are your credentials:

Username: ${email}
Password: ${password}

Please log in and update your password.

Best regards,
Your Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
}

// Main Function to Execute Workflow
async function main() {
  await connectToMongoDB();

  await processExcel();

  console.log(`${usersList.length} users prepared for registration.`);

  await registerUsers();

  mongoose.connection.close();
}

// Execute Main Function
main().catch((error) => console.error('Error in main execution:', error));
//npx ts-node src/service/readExcel.ts  