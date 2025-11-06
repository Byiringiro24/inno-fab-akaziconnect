// pages/api-upload/upload.js
import multer from 'multer';
import nextConnect from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });
const handler = nextConnect();
handler.use(upload.single('file'));

handler.post(async (req,res)=>{
  try{
    const file = req.file;
    if(!file) return res.status(400).end();
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, r) => {
      if (err) return res.status(500).json({ error: 'Upload error' });
      res.json({ url: r.secure_url });
    });
    stream.end(file.buffer);
  }catch(e){
    console.error(e);
    res.status(500).end();
  }
});

export const config = { api: { bodyParser: false } };
export default handler;
