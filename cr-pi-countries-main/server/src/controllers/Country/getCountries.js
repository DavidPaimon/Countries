const axios = require('axios');
const {Country} = require('../../db');

const getCountries = async() =>{
    
    const URL = 'http://localhost:5000/countries'

    try {
        const {data} = await axios(URL)

        let countries = await Promise.all(      //se crean los paises con las propiedades obtenidas de la API
            data.map(async(element)=>{
                const country = {
                    id:element.cca3,
                    name:element.name.common,
                    flags:element.flags.png,
                    capital:element.capital ? element.capital[0]: 'No Data',
                    continents:element.continents[0],
                    population:element.population,
                    subregion:element.subregion,
                    area:element.area ? element.area.toString() : 'No Data'
                }
    
                Country.findOrCreate({        //usamos el metodo findOrCreate del model Country para buscar un país con el mismo ID en la DB y crearlo si no existe. Se pasa un obj con las propiedades del país como argumento para la busqueda o creación
                    where:{
                        id:element.cca3,
                        name:element.name.common,
                        flags:element.flags.png,
                        capital:element.capital ? element.capital[0]: 'No Data',
                        continents:element.continents[0],
                        population:element.population,
                        subregion:element.subregion? element.subregion:'No Data',
                        area:element.area ? element.area.toString() : 'No Data'
                    }                
                })
                return country
            })
        )             
        return countries
    } catch (error) {
        return error
    }
}

module.exports = {getCountries}

//En resumen, este código obtiene datos de países desde una API
//los procesa y los almacena en una base de datos utilizando el modelo 'Country'. 
//Luego, devuelve los países como resultado de la función 'getCountries'.