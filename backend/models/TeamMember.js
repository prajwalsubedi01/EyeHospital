const mongoose=require('mongoose');

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
    image: {
      type: String, // Store filename or URL
      required: true,
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model('TeamMember',teamMemberSchema)