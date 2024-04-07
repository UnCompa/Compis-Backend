import { Router } from "express";
import ImageUpload from '../schemas/ImageUpload.js'
const imagesUpload = Router();

imagesUpload.get("/api/upload/images", (req, res) => {
    ImageUpload.find({})
    .then((images) => {
      res.json(images);
    });
});
imagesUpload.get("/api/upload/images/:id", (req, res) => {
    ImageUpload.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
});
imagesUpload.get("/api/upload/images/count", (req,res)=>{
    Image.countDocuments({}).then((count)=>{
        res.json(count)
    }).catch(e => res.json("El error es: " + e))
})
imagesUpload.post("/api/upload/images/upload", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const newImageUpload = new ImageUpload({
    name: body.name ?? "Imagen",
    url: body.url ?? "",
    publicId: body.publicId ?? ""
  });
  newImageUpload
    .save()
    .then((savedImage) => {
      res.json(savedImage);
    })
    .catch((e) => {
      console.log(e);
    });
});
// Para actualizar
imagesUpload.put("/api/upload/images/:id", (req, res) => {
  const ID = req.params.id;
  const body = req.body;
  const updatedImage = {
    name: body.name ?? "Imagen",
    url: body.url,
    publicId: body.publicId ?? ""
  };
  ImageUpload.findOneAndUpdate({ _id: ID }, updatedImage, {
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

imagesUpload.delete("/api/upload/images/:id", (req, res) => {
  const ID = req.params.id;

  ImageUpload.findByIdAndDelete(ID)
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

export default imagesUpload;
