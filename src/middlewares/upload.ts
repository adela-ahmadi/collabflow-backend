import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (_req, file) => ({
    folder: "collabflow/avatars",

    allowed_formats: ["jpg", "jpeg", "png"],

    public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
  }),
});

const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export default upload;
