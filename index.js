const http = require("http");

const { crearAnime } = require("./functions/crear");
const { leerAnimes } = require("./functions/leer");
const { actualizarAnime } = require("./functions/actualizar");
const { eliminarAnime } = require("./functions/eliminar");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const { searchParams, pathname } = new URL(
    req.url,
    `http://${req.headers.host}`
  );
  const params = new URLSearchParams(searchParams);

  if (pathname === "/anime" && req.method === "GET") {
    const id = params.get("id");
    const nombre = params.get("nombre");
    res.setHeader("content-type", "application/json");

    let animeGestionado;

    if (id) animeGestionado = await leerAnimes("id", id);

    if (nombre) animeGestionado = await leerAnimes("nombre", nombre);

    if (!id && !nombre) animeGestionado = await leerAnimes();

    res.statusCode = animeGestionado.status;
    res.write(JSON.stringify(animeGestionado));

    res.end();
  }

  if (pathname === "/anime" && req.method === "POST") {
    let body;

    req.on("data", (animePorEditar) => {
      body = JSON.parse(animePorEditar);
    });

    req.on("end", async () => {
      const animeGestionado = await crearAnime(body);

      res.setHeader("content-type", "application/json");
      res.statusCode = animeGestionado.status;
      res.end(JSON.stringify(animeGestionado));
    });
  }

  if (pathname === "/anime" && req.method === "PUT") {
    let body;

    req.on("data", (animePorEditar) => {
      body = JSON.parse(animePorEditar);
    });

    req.on("end", async () => {
      const id = params.get("id");
      const animeGestionado = await actualizarAnime(id, body);

      res.setHeader("content-type", "application/json");
      res.statusCode = animeGestionado.status;
      res.end(JSON.stringify(animeGestionado));
    });
  }

  if (pathname === "/anime" && req.method === "DELETE") {
    const id = params.get("id");
    const animeGestionado = await eliminarAnime(id);

    res.setHeader("content-type", "application/json");
    res.statusCode = animeGestionado.status;
    res.write(JSON.stringify(animeGestionado));
    res.end();
  }
});

server.listen(
  PORT,
  console.log(`Servidor conectado y escuchando en puerto ${PORT}`)
);

module.exports = { server };
