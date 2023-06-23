import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countries:[],
    allCountries:[],
    countriesForActivityOnly:[],
    country:{},
    activity:{},
    activities:[]
}

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        getCountries: (state,{payload})=>{      //actualiza las propiedades countries, allCountries y countriesFor... del estado con la carga útil recibida en la acción
            const data = payload;
            state.countries = data;
            state.allCountries = data;
            state.countriesForActivityOnly = data;
        },
        getCountryById: (state,{payload})=>{    //actualiza la propiedad country del estado con la carga útil recibida en la acción
            const data = payload;
            state.country = data;
        },
        orderByAtoZ:(state,{payload})=>{        //ordena la copia allCountries en el estado de acuerdo con el valor de la acción. Usa la función sort junto con localCompare para realizar la ordenación alfabética asc y desc
            const data = payload;
            const allCountriesCopy = [...state.allCountries]
            state.allCountries = data ==='A'
            ? allCountriesCopy.sort((a, b) => a.name.localeCompare(b.name))
            : allCountriesCopy.sort((a, b) => b.name.localeCompare(a.name))
            
        },
        orderByPopulation:(state,{payload})=>{  //ordena la copia de allCountries en la acción. Usa la función sort para realizar la ordenación asc y desc por población
            const data = payload;
            const allCountriesCopy = [...state.allCountries]
            state.allCountries = data ==='A'
            ? allCountriesCopy.sort((a,b) => a.population - b.population)
            : allCountriesCopy.sort((a,b) => b.population - a.population)
        },
        filterByContinent:(state,{payload})=>{  //filtra los países en la propiedad allCountries. Actualiza allCountries con los países filtrados o con la lista completa de países según el valor de la carga útil
            const data = payload;
            const allCountriesFilteredContinent = state.countries.filter(country=>country.continents === data)
            state.allCountries = data === 'All'
            ? state.countries
            : allCountriesFilteredContinent
        },
        getCountryByName:(state,{payload})=>{   //actualiza la propiedad countries y allCountries del estado con la carga útil recibida
            const data = payload;
            state.countries = data;
            state.allCountries = data;
        },
        postActivity:(state,{payload})=>{       //actualiza la propiedad activity del estado con la carga útil recibida en la acción
            const data = payload;
            state.activity = data;    
        },
        getActivities: (state,{payload})=>{     //actualiza la propiedad activities del estado con la carga útil recibida en la acción
            const data = payload;
            state.activities = data;
        },
        filterByActivity:(state,{payload})=>{   //filtra los países en la propiedad countries según la actividad especificada en la carga. Obtiene los ID de los países asociados a las actividades filtradas y actualiza allCountries con los países filtrados o con la lista completa de países según el valor de la carga útil
            const data = payload
            const activitiesCopy = state.activities.filter(activity => activity.name === data)
            let countriesID = []
            activitiesCopy.map(activity=> activity.Countries.map(country=> countriesID.push(country.id)))
            const countriesFilteredByActivity = state.countries.filter(country=> countriesID.includes(country.id))
            state.allCountries = data === 'No Activity'
            ? state.countries
            : countriesFilteredByActivity
        }   


    }
})


export const {getCountries, getCountryById, getCountryByName,postActivity, orderByAtoZ, orderByPopulation, filterByContinent,getActivities,filterByActivity} = countrySlice.actions;
export default countrySlice.reducer;