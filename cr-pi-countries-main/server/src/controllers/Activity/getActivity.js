const { Activity, Country } = require('../../db')

const getActivity = async () => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country, // Modelo "Country" se unirá a la consulta
        as: 'Countries', // Alias para la relación con "Country"
        attributes: ["id", "name"], // Selecciona solo las columnas "id" y "name" de "Country"
        through: { attributes: [] } // No se seleccionarán columnas de la tabla intermedia
      }
    })

    return activities // Devuelve los resultados de la consulta
  } catch (error) {
    throw Error // Lanza el error en caso de que ocurra uno
  }
}

module.exports = {
  getActivity
}

//este código obtiene todas las actividades turísticas de la base de datos y también incluye los países asociados a cada actividad. 
//La función 'getActivity' devuelve los resultados de la consulta, lo que permite acceder a las actividades y sus países asociados desde otros archivos.