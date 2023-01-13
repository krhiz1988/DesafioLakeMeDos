const express = require("express");
const cors = require("cors");
const {
  obtenerPosts,
  agregarPost,
  editarPost,
  borrarPost,
} = require("./consultas");

const app = express();
app.use(express.static("./"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Ha ocurrido un problema al mostrar los posts');
  }
});

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await editarPost(id);
    res.send("Post actualizado con éxito");
  } catch (error) {
    res.status(500).send('Ha ocurrido un problema al actualizar likes');
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await borrarPost(id);

    res.send("Post borrado con éxito");
  } catch (error) {
    res.status(500).send('Ha ocurrido un problema al borrar post');
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;

    await agregarPost(titulo, url, descripcion);

    res.send("Post agregado con éxito");
  } catch (error) {
    res.status(500).send('Ha ocurrido un problema al agregar un post');
  }
});

app.listen(3000, console.log("El servidor esta encendido"));
