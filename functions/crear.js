const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const crearAnime = async (data) => {
  try {
    if (!data)
      throw {
        code: 400,
        message: "Se debe incorporar un 'body' en la petición",
      };

    if (!Object.keys(data).length)
      throw {
        code: 400,
        message: "La petición debe contener información en el 'body'",
      };

    const anime = JSON.parse(await fs.readFile("./data/anime.json", "utf-8"));
    const nuevoID = uuidv4();

    anime[nuevoID] = { ...data };
    await fs.writeFile("./data/anime.json", JSON.stringify(anime));

    return {
      ok: true,
      status: 201,
      message: "El anime se ha creado satisfactoriamente!",
      data: { id: nuevoID, ...data },
    };
  } catch (error) {
    return {
      ok: false,
      status: error.code,
      message: error.message,
    };
  }
};

module.exports = { crearAnime };
