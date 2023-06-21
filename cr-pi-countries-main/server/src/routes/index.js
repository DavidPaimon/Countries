const { Router } = require("express"); // Importa el enrutador del módulo "express".
const { getCountries } = require('../controllers/Country/getCountries'); // Importa la función "getCountries" del controlador "getCountry".
const { getCountryById } = require("../controllers/Country/getCountryById"); // Importa la función "getCountryById" del controlador "getCountryById".
const { getCountryByName } = require("../controllers/Country/getCountryByName"); // Importa la función "getCountryByName" del controlador "getCountryByName".
const { postActivity } = require("../controllers/Activity/postActivity"); // Importa la función "postActivity" del controlador "postActivity".
const { getActivity } = require("../controllers/Activity/getActivity"); // Importa la función "getActivity" del controlador "getActivity".
const router = Router(); // Crea una instancia del enrutador.

router.get('/countries', async(req, res) => { // Ruta GET para obtener países.
  const { name } = req.query; // Obtiene el parámetro "name" de la consulta.

  if (!name) {
    try {
      const allCountries = await getCountries(); // Obtiene todos los países.
      res.status(200).json(allCountries); // Devuelve una respuesta exitosa con la lista de países.
    } catch (error) {
      res.status(500).json({ error: error.message }); // Devuelve un error interno del servidor.
    }
  } else {
    try {
      const filteredCountry = await getCountryByName(name); // Filtra los países por nombre.
      if (filteredCountry.length > 0) {
        res.status(200).json(filteredCountry); // Devuelve una respuesta exitosa con los países filtrados.
      } else {
        res.status(404).json({ error: `Country not Found` }); // Devuelve un error indicando que no se encontró el país.
      }
    } catch (error) {
      return res.status(404).json({ error: `Country not Found` }); // Devuelve un error indicando que no se encontró el país.
    }
  }

});

router.get('/countries/:id', async(req, res) => { // Ruta GET para obtener un país por su ID.
  const { id } = req.params; // Obtiene el parámetro "id" de la ruta.

  try {
    const country = await getCountryById(id.toUpperCase()); // Obtiene el país por su ID (convertido a mayúsculas).
    res.status(200).json(country); // Devuelve una respuesta exitosa con el país encontrado.
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: error.message }); // Devuelve un error interno del servidor.
  }
});

router.post('/activities', async(req, res) => { // Ruta POST para crear una actividad.
  const { name, difficulty, duration, season, countries } = req.body; // Obtiene los datos de la actividad del cuerpo de la solicitud.
  const newName = name.trim().toLowerCase(); // Elimina los espacios en blanco al principio y al final de "name" y lo convierte a minúsculas.
  const newDuration = duration.trim().toLowerCase(); // Elimina los espacios en blanco al principio y al final de "duration" y lo convierte a minúsculas.

  try {
    const activity = await postActivity(newName, difficulty, newDuration, season, countries); // Crea una nueva actividad.
    res.status(200).json(activity); // Devuelve una respuesta exitosa con la actividad creada.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Devuelve un error interno del servidor.
  }
});

router.get('/activities', async(req, res) => { // Ruta GET para obtener todas las actividades.
  try {
    const activities = await getActivity(); // Obtiene todas las actividades.
    res.status(200).send(activities); // Devuelve una respuesta exitosa con la lista de actividades.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Devuelve un error interno del servidor.
  }
});

module.exports = router; // Exporta el enrutador.