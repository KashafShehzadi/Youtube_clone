
import multer from "multer";

// Define the storage configuration for multer
const storage = multer.diskStorage({
    // Specify the destination directory for uploaded files
    destination: function (req, file, cb) {
      // Call the callback function with null (no error) and the destination path
      cb(null, "./public/temp")
    },
    // Specify the filename for uploaded files
    filename: function (req, file, cb) {
      // Call the callback function with null (no error) and the original filename
      cb(null, file.originalname)
    }
  });

// Export the multer upload function with the storage configuration
export const upload = multer({ 
    storage, 
});

