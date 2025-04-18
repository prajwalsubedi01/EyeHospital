const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // Store only the filename, not full path
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Notice", NoticeSchema);
