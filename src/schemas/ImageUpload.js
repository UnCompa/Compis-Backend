import mongoose, { Schema, model } from "mongoose";
import dayjs from "dayjs";
const ImageUploadSchema = new Schema(
  {
    name: String,
    url: String,
    publicId: String,
  },
  { timestamps: true }
);

ImageUploadSchema.set("toJSON", {
  transform: (document, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format("DD-MM-YYYY");
    ret.updatedAt = dayjs(ret.updatedAt).format("DD-MM-YYYY");
    ret.id = ret._id.toString(), 
    delete ret._id;
    delete ret.__v;
  },
});

const ImageUpload = model("ImageUpload", ImageUploadSchema);

export default ImageUpload;
