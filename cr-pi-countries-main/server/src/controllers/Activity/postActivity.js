const { Activity } = require('../../db') // Importa el modelo "Activity" desde el archivo "db.js"

const postActivity = async(name, difficulty, duration, season, countries) => { // Declara una función llamada "postActivity" que acepta cinco parámetros: "name", "difficulty", "duration", "season" y "countries". La función es asíncrona.

  if (!countries) throw Error('You Must Provide a Country') // Si "countries" no está definido o es false, se lanza un error con el mensaje indicado.

  if (![name, difficulty, duration, season].every(Boolean)) throw Error('Missing data') // Si alguno de los parámetros "name", "difficulty", "duration" o "season" es falsy, se lanza un error con el mensaje indicado.

  name.trim().toLowerCase() // Elimina los espacios en blanco al principio y al final de "name" y lo convierte a minúsculas, pero no se asigna el resultado a ninguna variable.

  duration.trim().toLowerCase() // Elimina los espacios en blanco al principio y al final de "duration" y lo convierte a minúsculas, pero no se asigna el resultado a ninguna variable.

  Array.isArray(countries) ? countries : [countries] // Si "countries" es un array, se mantiene sin cambios. Si no es un array, se envuelve en un array.

  const [newActivity, created] = await Activity.findOrCreate({ // Realiza una consulta a la base de datos utilizando el método "findOrCreate" del modelo "Activity". Se proporcionan los valores de búsqueda en el objeto "where".
    where: {
      name,
      difficulty,
      season,
      duration
    }
  })

  await newActivity.addCountries(countries) // Asocia los países especificados en "countries" con la actividad mediante el método "addCountries" en la instancia de "newActivity".

  return newActivity // Devuelve la instancia de la actividad "newActivity".
}

module.exports = {
  postActivity // Exporta la función "postActivity".
}
