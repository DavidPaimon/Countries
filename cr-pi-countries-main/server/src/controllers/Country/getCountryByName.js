const {Op} = require('sequelize')
const {Country} = require('../../db')

const getCountryByName = async(name)=>{     //toma un parametro name que es el nombre del país que se desea buscar
    
    try {
        const filteredCountry = await Country.findAll({     //usamos findAll del modelo Country para buscar todos los países que cumplan con la condición especifiada en el objeto where
            where:{
                name:{
                    [Op.iLike]:`%${name}%`
                }
            }
        })

        return filteredCountry.length>0 ? filteredCountry : new Error('Country not Found'); //el resultado de la busqueda se asigna a la variable filteredCountry
        
    } catch (error) {
        throw error.message;
    }

}

module.exports={getCountryByName}

//este código busca países en la base de datos que coincidan parcialmente con un nombre especificado y los devuelve como resultado. 