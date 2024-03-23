import mongoose from 'mongoose'
import dayjs from "dayjs"

mongoose.set('strictQuery', false);

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  autor: String,
  important: Boolean
}, {timestamps: true})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.createdAt = dayjs(returnedObject.createdAt).format("DD-MM-YYYY");
    returnedObject.updatedAt = dayjs(returnedObject.updatedAt).format("DD-MM-YYYY");
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Note = mongoose.model('Note', noteSchema);

export default Note;
