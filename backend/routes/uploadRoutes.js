// import express from 'express';
// import upload from '../middleware/multer.js';
// import cloudinary from '../utils/cloudinary.js';

// const router = express.Router();

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     // Convert buffer to base64 Data URI
//     const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

//     const result = await cloudinary.uploader.upload(fileStr, {
//       folder: 'engraved-by-amarts',
//     });

//     res.json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error);
//     res.status(500).json({ error: 'Image upload failed' });
//   }
// });

// export default router;

import express from 'express';
import upload from '../middleware/multer.js'; // should handle file upload
import cloudinary from '../utils/cloudinary.js'; // should be configured
import fs from 'fs';

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'engraved-by-amarts',
    });

    fs.unlinkSync(req.file.path); // delete the uploaded file locally
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ error: 'Image upload failed' });
    
  }
});

export default router;
