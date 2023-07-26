const fs = require("fs/promises");

const actualizarAnime = async (id, data) => {
  try {
    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));

    if (!anime[id])
      throw {
        code: 404,
        message:
          "No existe información relacionada, actualiza un anime existente o incorpora el 'body' con la función 'crear'",
      };

    const animeActualizado = { ...anime[id], ...data };
    anime[id] = animeActualizado;
    await fs.writeFile("./data/anime.json", JSON.stringify(anime));

    return {
      ok: true,
      status: 200,
      message: `El anime '${animeActualizado.nombre} se ha actualizado satisfactoriamente'`,
      data: anime[id],
    };
  } catch (error) {
    return {
      ok: false,
      status: error.code,
      message: error.message,
    };
  }
};

module.exports = { actualizarAnime };
