import mongoose, { Schema, model } from "mongoose";
import dayjs from "dayjs";
const VideoUploadSchema = new Schema(
  {
    name: String,
    url: String,
  },
  { timestamps: true }
);

VideoUploadSchema.set("toJSON", {
  transform: (document, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format("DD-MM-YYYY");
    ret.updatedAt = dayjs(ret.updatedAt).format("DD-MM-YYYY");
    ret.id = ret._id.toString(), 
    delete ret._id;
    delete ret.__v;
  },
});

const VideoUpload = model("VideoUpload", VideoUploadSchema);

export default VideoUpload;
