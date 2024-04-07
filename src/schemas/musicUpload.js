import mongoose, { Schema, model } from "mongoose";
import dayjs from "dayjs";
const MusicUploadSchema = new Schema(
  {
    name: String,
    url: String,
  },
  { timestamps: true }
);

MusicUploadSchema.set("toJSON", {
  transform: (document, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format("DD-MM-YYYY");
    ret.updatedAt = dayjs(ret.updatedAt).format("DD-MM-YYYY");
    ret.id = ret._id.toString(), 
    delete ret._id;
    delete ret.__v;
  },
});

const MusicUpload = model("MusicUpload", MusicUploadSchema);

export default MusicUpload;
