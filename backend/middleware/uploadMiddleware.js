const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'EyeHospitalUploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
// const multer = require("multer");
// const path = require("path");

// // Define file storage options
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');  // Specify the upload folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Add unique filename
//   },
// });

// // Initialize multer with storage options
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
//   fileFilter: (req, file, cb) => {
//     // Accept only images (jpg, png, jpeg)
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only images are allowed.'));
//     }
//   },
// });

// module.exports = upload;
