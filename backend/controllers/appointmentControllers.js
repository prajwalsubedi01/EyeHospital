const Appointment = require('../models/Appointment');
const { sendEmail} = require('../config/nodemailer');
const moment = require('moment');

const adminEmail = process.env.ADMIN_EMAIL;

// Create new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, phone, email, service, date, message } = req.body;
    
    const appointment = await Appointment.create({ 
      name, 
      phone, 
      email, 
      service, 
      date, 
      message,
      status: 'pending'
    });

    // Notify admin
    await sendEmail({
      to: adminEmail,
      subject: 'New Appointment Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Appointment Request</h2>
          <p>A new appointment request has been submitted:</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Details</h3>
            <p><strong>Patient:</strong> ${name}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${moment(date).format('MMMM D, YYYY h:mm A')}</p>
            <p><strong>Contact:</strong> ${phone} | ${email}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
          </div>
          
          <p>Please review and update the status in the admin panel.</p>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p>Best regards,</p>
            <p><strong>Appointment System</strong></p>
          </div>
        </div>
      `
    });

    // Send confirmation to user
    await sendEmail({
      to: email,
      subject: 'Appointment Request Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Your Appointment Request</h2>
          <p>Dear ${name},</p>
          <p>We've received your request for <strong>${service}</strong> on ${moment(date).format('MMMM D, YYYY')}.</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Your Request Details</h3>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Requested Date:</strong> ${moment(date).format('MMMM D, YYYY h:mm A')}</p>
            <p><strong>Status:</strong> Pending Approval</p>
          </div>
          
          <p>Our team will review your request and send you a confirmation within 24 hours.</p>
          <p>If you have any questions, please contact us at ${adminEmail}.</p>
          
          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <p>Best regards,</p>
            <p><strong>Eye Hospital Team</strong></p>
          </div>
        </div>
      `
    });

    res.status(201).json({ 
      success: true,
      message: 'Appointment submitted successfully', 
      appointment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json({ 
      success: true,
      appointments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;
  
      // Validate input
      if (!['confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status value'
        });
      }
  
      // Find and update appointment
      const appointment = await Appointment.findByIdAndUpdate(
        id,
        { status, ...(reason && { cancellationReason: reason }) },
        { new: true }
      );
  
      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found'
        });
      }
  
      // Send professional email notification
      try {
        const emailContent = generateStatusEmail(appointment, status, reason);
        await sendEmail({
          to: appointment.email,
          subject: emailContent.subject,
          html: emailContent.body
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue even if email fails
      }
  
      res.status(200).json({
        success: true,
        message: `Appointment ${status}`,
        appointment
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
  // Professional email template generator
  const generateStatusEmail = (appointment, status, reason) => {
    const formattedDate = moment(appointment.date).format('dddd, MMMM D, YYYY [at] h:mm A');
    
    if (status === 'confirmed') {
      return {
        subject: `✅ Your Appointment Confirmation - ${appointment.service}`,
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background: #f0f7ff; padding: 20px; border-radius: 8px;">
              <h1 style="color: #2563eb; margin: 0;">Appointment Confirmed!</h1>
            </div>
            
            <div style="padding: 20px;">
              <p>Dear ${appointment.name},</p>
              <p>Your appointment has been <strong>confirmed</strong> with the following details:</p>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2563eb;">
                <h3 style="margin-top: 0; color: #1e40af;">Appointment Details</h3>
                <p><strong>Service:</strong> ${appointment.service}</p>
                <p><strong>Date & Time:</strong> ${formattedDate}</p>
                <p><strong>Reference ID:</strong> ${appointment._id.toString().slice(-8)}</p>
              </div>
              
              <p>Please arrive 15 minutes before your scheduled time and bring any necessary documents.</p>
              <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
              
              <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                <p>Best regards,</p>
                <p><strong>The Eye Hospital Team</strong></p>
                <p>📞 +9779826991540 | ✉️ contact@eyehospital.com</p>
                <p style="font-size: 12px; color: #64748b;">
                  This is an automated message - please do not reply directly to this email
                </p>
              </div>
            </div>
          </div>
        `
      };
    } else {
      return {
        subject: `⚠️ Appointment Cancellation - ${appointment.service}`,
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background: #fff0f0; padding: 20px; border-radius: 8px;">
              <h1 style="color: #dc2626; margin: 0;">Appointment Cancelled</h1>
            </div>
            
            <div style="padding: 20px;">
              <p>Dear ${appointment.name},</p>
              <p>We regret to inform you that your appointment has been <strong>cancelled</strong>.</p>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #dc2626;">
                <h3 style="margin-top: 0; color: #991b1b;">Original Appointment</h3>
                <p><strong>Service:</strong> ${appointment.service}</p>
                <p><strong>Requested Date:</strong> ${formattedDate}</p>
                ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
              </div>
              
              <p>Possible reasons for cancellation:</p>
              <ul style="padding-left: 20px;">
                <li>No available slots at requested time</li>
                <li>Specialist unavailable</li>
                <li>Service requirements not met</li>
              </ul>
              
              <p style="margin-top: 20px;">
                <a href="https://aesthitic.netlify.app/appointment" 
                   style="background: #2563eb; color: white; padding: 10px 15px; border-radius: 5px; text-decoration: none;">
                  Reschedule Appointment
                </a>
              </p>
              
              <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                <p>We apologize for any inconvenience.</p>
                <p><strong>The Eye Hospital Team</strong></p>
                <p>📞 +9779826991540 | ✉️ contact@eyehospital.com</p>
              </div>
            </div>
          </div>
        `
      };
    }
  };

// Delete appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    
    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};