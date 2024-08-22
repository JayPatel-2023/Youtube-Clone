import multer from "multer";

// Set up the storage configuration for multer
const storage = multer.diskStorage({
    
  // Specify the destination folder where uploaded files should be stored
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Files will be stored in the "public/temp" directory
  },

  // Specify the filename format for the uploaded files
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
