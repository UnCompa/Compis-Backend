import { Router } from "express";
import MusicUpload from '../schemas/musicUpload.js'
const musicUpload = Router();

musicUpload.get("/api/upload/audio", (req, res) => {
    MusicUpload.find({})
    .then((images) => {
      res.json(images);
    });
});
musicUpload.get("/api/upload/audio/:id", (req, res) => {
    MusicUpload.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
});
musicUpload.get("/api/upload/audio/count", (req,res)=>{
    MusicUpload.countDocuments({}).then((count)=>{
        res.json(count)
    }).catch(e => res.json("El error es: " + e))
})
musicUpload.post("/api/upload/audio/upload", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const newMusicUpload = new MusicUpload({
    name: body.name ?? "Audio",
    url: body.url ?? "",
  });
  newMusicUpload
    .save()
    .then((savedImage) => {
      res.json(savedImage);
    })
    .catch((e) => {
      console.log(e);
    });
});
// Para actualizar
musicUpload.put("/api/upload/audio/:id", (req, res) => {
  const ID = req.params.id;
  const body = req.body;
  const updatedMusic = {
    name: body.name ?? "Audio",
    url: body.url,
  };
  MusicUpload.findOneAndUpdate({ _id: ID }, updatedMusic, {
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

musicUpload.delete("/api/upload/audio/:id", (req, res) => {
  const ID = req.params.id;

  MusicUpload.findByIdAndDelete(ID)
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

export default musicUpload;
