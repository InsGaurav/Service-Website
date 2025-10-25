const nodemailer = require('nodemailer');

// Configure email transporter

console.log('═══════ EMAIL CONFIG DEBUG ═══════');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NOT SET');
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? `SET (${process.env.EMAIL_PASSWORD.length} chars)` : 'NOT SET');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'NOT SET');
console.log('═══════════════════════════════════');


const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'smtp.gmail.com'
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your app password
  },
});

// Send contact form email
const sendContactEmail = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ 
      msg: 'Please provide all required fields: firstName, lastName, email, and message' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Please provide a valid email address' });
  }

  try {
    // Email content to send to your admin email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Your admin email where you want to receive messages
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #a444c2; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Name:</strong>
              <p style="color: #666; margin: 5px 0;">${firstName} ${lastName}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Email:</strong>
              <p style="color: #666; margin: 5px 0;">${email}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Phone:</strong>
              <p style="color: #666; margin: 5px 0;">${phone || 'Not provided'}</p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #333;">Message:</strong>
              <p style="color: #666; margin: 5px 0; line-height: 1.6;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              This email was sent from your website contact form.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Optionally, send a confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #a444c2; margin-bottom: 20px;">Thank You for Contacting Us!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              Dear ${firstName},
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
            </p>
            
            <p style="color: #666; line-height: 1.6;">
              Your message:
            </p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <p style="color: #333; margin: 0;">${message}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              Your Team
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationMailOptions);

    res.status(200).json({ 
      msg: 'Your message has been sent successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      msg: 'Failed to send your message. Please try again later.',
      error: error.message 
    });
  }
};

module.exports = { sendContactEmail };
