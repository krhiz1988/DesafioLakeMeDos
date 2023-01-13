const { Pool } = require("pg");

const credenciales = {
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "likename",
  port: "5432",
  allowExitOnIdle: true,
};

const clientBD = new Pool(credenciales);

const agregarPost = async (titulo, url, descripcion) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)";
  const data = [titulo, url, descripcion];
  const response = await clientBD.query(consulta, data);
  return response;
};

const editarPost = async (id) => {
  const consulta = "UPDATE posts SET likes=likes+1 WHERE id=$1";
  const data = [id];
  const response = await clientBD.query(consulta, data);
  return response;
};

const borrarPost = async (id) => {
  const consulta = `delete from posts where id=$1`;
  const response = await clientBD.query(consulta, [id]);
  return response;
};

const obtenerPosts = async () => {
  const consulta = "SELECT * FROM posts";
  const { rows } = await clientBD.query(consulta);
  return rows;
};

module.exports = { agregarPost, obtenerPosts, borrarPost, editarPost };
