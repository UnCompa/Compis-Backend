import { Router } from "express";
import Note from "./../schemas/notas.js";
const notas = Router();

notas.get("/notas", (req, res) => {
  Note.find({})
    .sort({ date: -1 })
    .then((notes) => {
      res.json(notes);
    });
});
notas.get("/notas/count", (req, res) => {
  Note.countDocuments({})
    .then((count) => {
      res.json(count);
    }).catch(e => res.json(e))
});
notas.get("/notas/:id", (req, res) => {
  Note.findById(req.params.id).then((note) => {
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  });
});
notas.post("/notas", (req, res) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    title: body.title || "Sin titulo",
    autor: body.autor || "Anonimo",
    content: body.content || "",
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

notas.put("/notas/:id", (req, res) => {
  const ID = req.params.id;
  const body = req.body;
  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const updatedNote = {
    title: body.title || "",
    content: body.content || "",
    important: body.important ?? false,
  };
  Note.findOneAndUpdate({ _id: ID }, updatedNote, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      if (!updatedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(updatedNote);
    })
    .catch((error) => {
      console.error("Error updating note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});
notas.delete("/notas/:id", (req, res) => {
  const ID = req.params.id;

  Note.findByIdAndDelete(ID)
    .then((deletedNote) => {
      if (!deletedNote) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json({ message: "Note deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

export default notas;
