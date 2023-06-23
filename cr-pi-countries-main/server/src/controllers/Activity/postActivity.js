const {Activity} = require('../../db')


const postActivity = async(name,dificulty,duration,season,countries) => {
    
    if(!countries) throw Error('You Must Provide a Country')        //si no se da un país en el param countries, se lanza un error

    if(![name,dificulty,duration,season].every(Boolean)) throw Error('Missing data')    //si algunos de los params name, difficulty... es falso (undefined, null, cadena vacía...) lanza un error con el msj missing data

    name.trim().toLowerCase();
    duration.trim().toLowerCase();    //eliminamos espacios en blanco y se convierten en minusculas. Sin embargo esta transformación no modifica los valores originales, ya que los resultados no se asignan a ninguna variable

    Array.isArray(countries) ? countries : [countries]; //si el param countries es un array, se mantiene sin cambios, si no lo es, se crea un nuevo array con countries como su único elemento

    const [newActivity,created] = await Activity.findOrCreate({where:{  //usamos findOrCreate del model Activity para buscar una actividad con los mismos valores del name, season... en la DB
        name,
        dificulty,
        season,
        duration
    }})

    await newActivity.addCountries(countries)   //asociamos y relacionamos los paises en la tabla de asociación entre la actividad y los países

    return newActivity

}

module.exports = {
    postActivity
}

//este código crea una actividad turística en la base de datos, la asocia a uno o varios países y devuelve la actividad creada como resultado. 
//También realiza validaciones en los parámetros y realiza algunas transformaciones antes de realizar las operaciones en la base de datos.