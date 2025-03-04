import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, message } = req.body;

    // Ensure required fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Configure Nodemailer transporter
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Use Namecheap SMTP
        port: 465, // or 587 if TLS
        secure: true, // True for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS, // Environment variable, NOT hardcoded
        },
    });

    try {
        await transporter.sendMail({
            from: `"Ideal Integrated Services" <${process.env.SMTP_USER}>`,
            to: "info@idealintegratedservices.com",
            subject: "New Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        return res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ success: false, message: "Failed to send email." });
    }
}
