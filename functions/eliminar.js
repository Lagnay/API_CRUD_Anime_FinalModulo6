const fs = require("fs/promises");

const eliminarAnime = async (id) => {
  try {
    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));
    const animeEliminado = anime[id];

    if (!animeEliminado)
      throw {
        code: 404,
        message:
          "No existe información relacionada, elimina un anime existente o incorpora el 'body' con la función 'crear'",
      };

    delete anime[id];
    await fs.writeFile("./data/anime.json", JSON.stringify(anime));
    return {
      ok: true,
      status: 200,
      message: `El anime '${animeEliminado.nombre} se ha eliminado satisfactoriamente'`,
      erasedData: animeEliminado,
    };
  } catch (error) {
    return {
      ok: false,
      status: error.code,
      message: error.message,
    };
  }
};

module.exports = { eliminarAnime };
