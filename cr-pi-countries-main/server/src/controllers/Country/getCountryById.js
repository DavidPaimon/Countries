const { Country } = require('../../db'); // Importa el modelo "Country" desde el archivo "db.js".

const getCountryById = async(id) => { // Declara una función llamada "getCountryById" que es asíncrona y acepta un parámetro "id".

  try {
    const country = await Country.findOne({ where: { id } }); // Busca un país en la base de datos utilizando el método "findOne" del modelo "Country" y el valor del parámetro "id".

    return country; // Devuelve el país encontrado.

  } catch (error) {
    throw error; // Lanza el error si ocurre una excepción durante la ejecución.
  }
}

module.exports = {
  getCountryById // Exporta la función "getCountryById".
}
