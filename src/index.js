import express from "express";
import cors from "cors";
import "./connection.js";
import ImagesRouter from './router/imagesRouter.js'
import NotasRouter from './router/notasRouter.js'
const app = express();
app.use(cors());
app.use(express.json());
// Rutas 
app.use(ImagesRouter)
app.use("/api", NotasRouter)

app.get("/",(req,res)=>{
  res.send("Bienvenido a mi API")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
