import express from "express";
import cors from "cors";
import "./connection.js";
import Image from "./schemas/Images.js";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/images", (req, res) => {
  Image.find({})
    .sort({ createAt: -1 })
    .then((images) => {
      res.json(images);
    });
});
app.get('/api/images/:id', (req, res) => {
   const ID = req.params.id;
    Image.findById(ID).then(image => {
        if (image) {
            res.json(image)
        } else {
            res.status(404).end()
        }
    })
})
app.post("/api/images/upload", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const newImage = new Image({
    title: body.title,
    description: body.description,
    url: body.url,
    publicId: body.publicId,
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
app.put("/api/images/:id", (req, res) => {
  const ID = req.params.id;
  const body = req.body;
  const updatedImage = {
    title: body.title,
    description: body.description,
    url: body.url,
    publicId: body.publicId,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
app.delete('/api/images/:id', (req, res) => {
  const ID = req.params.id;

  Image.findByIdAndDelete(ID)
      .then(deletedNote => {
          if (!deletedNote) {
              return res.status(404).json({ error: 'No se encontro la Imagen' });
          }
          res.json({ message: 'Se borro correctamente' });
      })
      .catch(error => {
          console.error('Error deleting Image:', error);
          res.status(500).json({ error: 'Internal server error' });
      });
});
