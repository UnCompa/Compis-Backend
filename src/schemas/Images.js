import mongoose, { Schema, model } from "mongoose";
import dayjs from "dayjs";
const imagesSchema = new Schema(
  {
    title: String,
    description: String,
    url: String,
    publicId: String,
  },
  { timestamps: true }
);

imagesSchema.set("toJSON", {
  transform: (document, ret) => {
    ret.createdAt = dayjs(ret.createdAt).format("DD-MM-YYYY");
    ret.updatedAt = dayjs(ret.updatedAt).format("DD-MM-YYYY");
    ret.id = ret._id.toString(), 
    delete ret._id;
    delete ret.__v;
  },
});

const Image = model("Image", imagesSchema);

export default Image;
