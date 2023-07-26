const fs = require("fs/promises");

const leerAnimes = async (param, value) => {
  try {
    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));
    let buscar = {};

    switch (param) {
      case "id":
        buscar = anime[value];

        break;

      case "nombre":
        buscar = Object.values(anime).find(
          (item) => item.nombre.toLowerCase() === value.toLowerCase()
        );

        break;
      default:
        buscar = anime;
    }

    if (!buscar)
      throw {
        code: 404,
        message:
          "No existe información relacionada, intenta una nueva búsqueda o incorpora el 'body' con la función 'crear'",
      };

    return { ok: true, status: 200, data: buscar };
  } catch (error) {
    return { ok: false, status: error.code, message: error.message };
  }
};

module.exports = { leerAnimes };
