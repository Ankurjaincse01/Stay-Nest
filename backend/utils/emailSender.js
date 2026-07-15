const nodemailer = require("nodemailer");

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your_email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your_app_password",
  },
});

// Send verification email
const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || "your_email@gmail.com",
      to: email,
      subject: "Email Verification - StayNest",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f0f2f5; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">Welcome to StayNest! 🏠</h2>
            <p style="color: #666; font-size: 16px;">Thank you for signing up. Please verify your email address to activate your account.</p>
            
            <div style="margin: 30px 0;">
              <a href="${verificationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px;">Or copy and paste this link:</p>
            <p style="color: #999; font-size: 12px; word-break: break-all;">${verificationLink}</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">This link expires in 24 hours.</p>
            <p style="color: #999; font-size: 12px;">If you didn't sign up for StayNest, please ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    return false;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || "your_email@gmail.com",
      to: email,
      subject: "Password Reset - StayNest",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f0f2f5; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p style="color: #666; font-size: 16px;">We received a request to reset your password. Click the link below to create a new password.</p>
            
            <div style="margin: 30px 0;">
              <a href="${resetLink}" style="display: inline-block; background-color: #2196F3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #999; font-size: 14px;">Or copy and paste this link:</p>
            <p style="color: #999; font-size: 12px; word-break: break-all;">${resetLink}</p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px;">This link expires in 1 hour.</p>
            <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    return false;
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
