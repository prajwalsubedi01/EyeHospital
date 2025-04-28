const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    facebook: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    instagram: {
      type: String,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);