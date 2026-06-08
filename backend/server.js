import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://portfolio-smoky-two-c9gafk8lgy.vercel.app",
  "http://localhost:8080",
  "http://localhost:3000",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: Origin "${origin}" not allowed`));
  },
  credentials: true,
}));
app.use(express.json());

// Validation helpers matching frontend logic
const validateName = (val) => {
  const trimmed = val.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < 3) return "Name must be at least 3 characters.";
  if (trimmed.length > 50) return "Name must be at most 50 characters.";
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(trimmed)) return "Only letters and spaces are allowed.";
  const lower = trimmed.toLowerCase();
  const dummyNames = ["abc", "xyz", "test", "fake", "asdf", "apple banana cherry"];
  if (dummyNames.some(dummy => lower.includes(dummy))) return "Please enter a valid name.";
  return "";
};

const validateEmail = (val) => {
  const trimmed = val.trim();
  if (!trimmed) return "Email is required.";
  
  // Strict format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return "Please enter a valid email format.";
  
  const lower = trimmed.toLowerCase();
  const [localPart, domain] = lower.split("@");

  // Block obvious fake patterns
  const fakePatterns = [
    "test", "fake", "qwerty", "asdf", "abc123", "temp", "dummy", "sample",
    "12345", "admin", "noreply", "no-reply"
  ];
  if (fakePatterns.some((pattern) => localPart.includes(pattern))) {
    return "Please provide a real email address.";
  }

  // Reject emails with random keyboard-spam patterns
  if (/[bcdfghjklmnpqrstvwxz]{5,}/.test(localPart)) {
    return "Email appears to contain random characters.";
  }
  
  const walks = [
    "qwer", "wert", "erty", "rtyu", "tyui", "yuio", "uiop",
    "asdf", "sdfg", "dfgh", "fghj", "ghjk", "hjkl",
    "zxcv", "xcvb", "cvbn", "vbnm"
  ];
  if (walks.some((walk) => localPart.includes(walk))) {
    return "Email contains invalid sequences.";
  }

  if (/(.)\1{3,}/.test(localPart)) {
    return "Email contains invalid repeating characters.";
  }

  const disposableDomains = [
    "mailinator.com", "yopmail.com", "tempmail.com", "10minutemail.com",
    "sharklasers.com", "guerrillamail.com", "dispostable.com",
    "getairmail.com", "burnermail.io", "throwawaymail.com",
    "temp-mail.org", "trashmail.com"
  ];
  if (disposableDomains.includes(domain)) return "Temporary/disposable email domains are not allowed.";
  
  return "";
};

const validateMessage = (val) => {
  if (!val.trim()) return "Message is required.";
  if (val.trim().length < 10) return "Message must be at least 10 characters.";
  return "";
};

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Nodemailer transporter error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const otpStore = new Map();

// Generate and Send OTP
app.post('/api/contact/send-otp', async (req, res) => {
  const { email } = req.body;
  console.log(`[OTP Request Received] Email: ${email}`);
  
  const emailError = validateEmail(email || "");
  if (emailError) {
    console.log(`[OTP Request Failed] Invalid email: ${email}`);
    return res.status(400).json({ success: false, message: emailError });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store with 5 min expiration
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
    verified: false
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Portfolio Contact Verification",
      text: `Your verification code is: ${otp}\n\nIt expires in 5 minutes.`,
      html: `<p>Your verification code is: <strong>${otp}</strong></p><p>It expires in 5 minutes.</p>`
    });
    console.log(`[OTP Email Sent] Successfully sent OTP to: ${email}`);
    return res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error(`[OTP Email Error] Failed to send OTP to ${email}:`, error);
    return res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

// Verify OTP
app.post('/api/contact/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  console.log(`[OTP Verification Received] Email: ${email}, OTP: ${otp}`);
  
  const record = otpStore.get(email);
  
  if (!record) {
    console.log(`[OTP Verification Failed] No record found for: ${email}`);
    return res.status(400).json({ success: false, message: "No OTP found. Please request a new one." });
  }
  
  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ success: false, message: "OTP has expired." });
  }
  
  if (record.otp !== otp) {
    console.log(`[OTP Verification Failed] Invalid OTP for: ${email}`);
    return res.status(400).json({ success: false, message: "Invalid OTP." });
  }
  
  record.verified = true;
  console.log(`[OTP Verification Success] Email verified: ${email}`);
  return res.json({ success: true, message: "Email verified successfully." });
});

// Contact API Route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  console.log(`[Contact Request Received] Name: ${name}, Email: ${email}`);
  
  // Validation
  const nameError = validateName(name || "");
  const emailError = validateEmail(email || "");
  const messageError = validateMessage(message || "");

  if (nameError || emailError || messageError) {
    return res.status(400).json({ 
      success: false, 
      message: "Validation failed.", 
      errors: { name: nameError, email: emailError, message: messageError } 
    });
  }

  // Enforce OTP verification
  const record = otpStore.get(email);
  if (!record || !record.verified) {
    console.log(`[Contact Request Failed] Email not verified: ${email}`);
    return res.status(403).json({ success: false, message: "Email is not verified." });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'durgalanka2006@gmail.com', // Sending to the requested email
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Contact Request Success] Message sent id: ${info.messageId}`);

    // Send auto-reply confirmation to the user
    try {
      await transporter.sendMail({
        from: `"Lanka Durga" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Thanks for reaching out! — Lanka Durga",
        text: `Hi ${name},\n\nThank you for getting in touch! I've received your message and will get back to you as soon as possible.\n\nHere's a copy of what you sent:\n---\n${message}\n---\n\nBest regards,\nLanka Durga\nhttps://portfolio-smoky-two-c9gafk8lgy.vercel.app`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
            <h2 style="color: #ffffff; margin-bottom: 8px;">Hi ${name} 👋</h2>
            <p style="color: #a1a1aa; line-height: 1.7; font-size: 15px;">
              Thank you for getting in touch! I've received your message and will get back to you as soon as possible.
            </p>
            <div style="margin: 24px 0; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border-left: 3px solid #3b82f6;">
              <p style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Your Message</p>
              <p style="color: #d4d4d8; line-height: 1.6; font-size: 14px;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color: #a1a1aa; line-height: 1.7; font-size: 15px;">
              Best regards,<br/>
              <strong style="color: #ffffff;">Lanka Durga</strong>
            </p>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;" />
            <p style="color: #52525b; font-size: 12px; text-align: center;">
              <a href="https://portfolio-smoky-two-c9gafk8lgy.vercel.app" style="color: #3b82f6; text-decoration: none;">portfolio-smoky-two-c9gafk8lgy.vercel.app</a>
            </p>
          </div>
        `
      });
      console.log(`[Auto-Reply Sent] Confirmation email sent to: ${email}`);
    } catch (replyError) {
      // Don't fail the whole request if auto-reply fails
      console.error(`[Auto-Reply Error] Failed to send confirmation to ${email}:`, replyError);
    }

    // Clear verification after successful submit
    otpStore.delete(email);

    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(`[Contact Request Error] Failed to send email for ${email}:`, error);
    return res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
