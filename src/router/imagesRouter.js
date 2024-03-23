import { Router } from "express";
import Image from '../schemas/Images.js'
const images = Router();

images.get("/api/images", (req, res) => {
  Image.find({})
    .sort({ createAt: -1 })
    .then((images) => {
      res.json(images);
    });
});
images.get("/api/images/:id", (req, res) => {
  Image.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
});
images.get("/api/images/count", (req,res)=>{
    Image.countDocuments({}).then((count)=>{
        res.json(count)
    }).catch(e => res.json("El error es: " + e))
})
images.post("/api/images/upload", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const newImage = new Image({
    title: body.title,
    description: body.description,
    url: body.url,
  });
  newImage
    .save()
    .then((savedImage) => {
      res.json(savedImage);
    })
    .catch((e) => {
      console.log(e);
    });
});
// Para actualizar
images.put("/api/images/:id", (req, res) => {
  const ID = req.params.id;
  const body = req.body;
  const updatedImage = {
    title: body.title,
    description: body.description,
    url: body.url,
  };
  Image.findOneAndUpdate({ _id: ID }, updatedImage, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      if (!updatedNote) {
        return res.status(404).json({ error: "Imagen no encontrada" });
      }
      res.json(updatedNote);
    })
    .catch((error) => {
      console.error("Error al actualizar esta imagen:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

images.delete("/api/images/:id", (req, res) => {
  const ID = req.params.id;

  Image.findByIdAndDelete(ID)
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404).json({ error: "No se encontro la Imagen" });
      }
      res.json({ message: "Se borro correctamente" });
    })
    .catch((error) => {
      console.error("Error deleting Image:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

export default images;
