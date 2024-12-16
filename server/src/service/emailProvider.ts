import nodemailer from 'nodemailer';
import { createTransport, Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * Sends a registration email with account credentials
   * @param email Recipient's email address
   * @param password Temporary password to send
   */
  async sendRegistrationEmail(email: string, password: string): Promise<void> {
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
      await this.transporter.sendMail(mailOptions);
      console.log(`Registration email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending registration email to ${email}:`, error);
      throw error; // Rethrow to allow caller to handle
    }
  }

    /**
   * Sends an OTP email
   * @param email Recipient's email address
   * @param otp The OTP to send
   */
  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Hello,

Your OTP code is: ${otp}

Please use this code to complete your verification.

Best regards,
NEPTA`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`OTP email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending OTP email to ${email}:`, error);
      throw error; // Rethrow to allow caller to handle
    }
  }

}

// Export a singleton instance
export const emailService = new EmailService();