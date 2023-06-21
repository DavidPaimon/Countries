const { Op } = require('sequelize'); // Importa el operador de Sequelize "Op" para realizar operaciones de consulta avanzadas.
const { Country } = require('../../db'); // Importa el modelo "Country" desde el archivo "db.js".

const getCountryByName = async(name) => { // Declara una función llamada "getCountryByName" que es asíncrona y acepta un parámetro "name".

  try {
    const filteredCountry = await Country.findAll({ // Busca países en la base de datos utilizando el método "findAll" del modelo "Country".
      where: {
        name: {
          [Op.iLike]: `%${name}%` // Utiliza el operador [Op.iLike] de Sequelize para realizar una comparación insensible a mayúsculas y minúsculas y buscar países que contengan el valor de "name".
        }
      }
    });

    return filteredCountry.length > 0 ? filteredCountry : new Error('Country not Found'); // Devuelve los países encontrados si existen, de lo contrario, lanza un error indicando que no se encontró el país.

  } catch (error) {
    throw error.message; // Lanza el mensaje de error si ocurre una excepción durante la ejecución.
  }

}

module.exports = {
  getCountryByName // Exporta la función "getCountryByName".
}
