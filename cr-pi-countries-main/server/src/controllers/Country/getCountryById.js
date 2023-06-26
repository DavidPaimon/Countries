const {Country} = require('../../db')

const getCountryById = async(id) => {

    try {
        
        const country = await Country.findOne({where:{id}})
        
        return country

    } catch (error) {
        throw error
    }
}

module.exports = {
    getCountryById
}

//este código busca un país en la base de datos utilizando su ID y devuelve el país encontrado o 'null' si no se encuentra