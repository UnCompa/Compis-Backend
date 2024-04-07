import { Router } from "express";
import VideoUpload from '../schemas/videoUpload.js'
const videoRouter = Router();

videoRouter.get("/api/upload/video", (req, res) => {
    VideoUpload.find({})
    .then((images) => {
      res.json(images);
    });
});
videoRouter.get("/api/upload/video/:id", (req, res) => {
    VideoUpload.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
});
videoRouter.get("/api/upload/video/count", (req,res)=>{
    VideoUpload.countDocuments({}).then((count)=>{
        res.json(count)
    }).catch(e => res.json("El error es: " + e))
})
videoRouter.post("/api/upload/video/upload", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const newVideoUpload = new VideoUpload({
    name: body.name ?? "video",
    url: body.url ?? "",
  });
  newVideoUpload
    .save()
    .then((savedImage) => {
      res.json(savedImage);
    })
    .catch((e) => {
      console.log(e);
    });
});
// Para actualizar
videoRouter.put("/api/upload/video/:id", (req, res) => {
  const ID = req.params.id;
  const body = req.body;
  const updatedMusic = {
    name: body.name ?? "video",
    url: body.url,
  };
  VideoUpload.findOneAndUpdate({ _id: ID }, updatedMusic, {
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

videoRouter.delete("/api/upload/video/:id", (req, res) => {
  const ID = req.params.id;

  VideoUpload.findByIdAndDelete(ID)
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404).json({ error: "No se encontro el Video" });
      }
      res.json({ message: "Se borro correctamente" });
    })
    .catch((error) => {
      console.error("Error deleting Video:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

export default videoRouter;
