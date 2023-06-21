const axios = require('axios'); // Importa la biblioteca "axios" para realizar solicitudes HTTP.
const { Country } = require('../../db'); // Importa el modelo "Country" desde el archivo "db.js".

const getCountries = async() => { // Declara una función llamada "getCountries" que es asíncrona y no acepta parámetros.

  const URL = 'http://localhost:5000/countries'; // Define la URL de la API de países.

  try {
    const { data } = await axios(URL); // Realiza una solicitud HTTP a la URL y obtiene la respuesta en la variable "data".

    let countries = await Promise.all( // Utiliza Promise.all para realizar un conjunto de operaciones asíncronas en paralelo.
      data.map(async (element) => { // Itera sobre cada elemento de "data".
        const country = {
          id: element.cca3, // Obtiene el código del país.
          name: element.name.common, // Obtiene el nombre común del país.
          flags: element.flags.png, // Obtiene la URL de la bandera del país.
          capital: element.capital ? element.capital[0] : 'No Data', // Obtiene la capital del país o establece 'No Data' si no hay datos.
          continents: element.continents[0], // Obtiene el continente del país.
          population: element.population, // Obtiene la población del país.
          subregion: element.subregion, // Obtiene la subregión del país o establece 'No Data' si no hay datos.
          area: element.area ? element.area.toString() : 'No Data' // Obtiene el área del país o establece 'No Data' si no hay datos.
        };

        Country.findOrCreate({ // Busca o crea un registro en la base de datos utilizando el método "findOrCreate" del modelo "Country".
          where: {
            id: element.cca3,
            name: element.name.common,
            flags: element.flags.png,
            capital: element.capital ? element.capital[0] : 'No Data',
            continents: element.continents[0],
            population: element.population,
            subregion: element.subregion ? element.subregion : 'No Data',
            area: element.area ? element.area.toString() : 'No Data'
          }
        });

        return country; // Devuelve el objeto "country".
      })
    );

    return countries; // Devuelve la lista de países obtenida de la API.

  } catch (error) {
    return error; // Devuelve el error si ocurre una excepción durante la ejecución.
  }
}

module.exports = { getCountries }; // Exporta la función "getCountries".
