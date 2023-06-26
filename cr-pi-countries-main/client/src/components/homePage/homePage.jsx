import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CountryCard from '../countryCard/countryCard';
import style from './homePage.module.css';

const countriesPerPage = 10;  //número de países por página
const visiblePageButtons = 5; //número de botones de página

const HomePage = () => {
  const allcountries = useSelector((state) => state.country.allCountries);  //parte del estado de Redux obtenido mediante un useSelector que contiene la lista de todos los países

  const [totalPages, setTotalPages] = useState(0); //estado local que almacena el número total de páginas
  const [page, setPage] = useState(0);             //estado local que almacena la página actual

  useEffect(() => {
    setTotalPages(Math.ceil(allcountries.length / countriesPerPage));  //se ejecuta cuando allCountries cambia. Calcula el número total de páginas con Math.ceil y establece totalPages y page en el estado local
    setPage(localStorage.getItem('currentPage') || 0);                                                        //
  }, [allcountries]);

  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

  if (allcountries.length === 0) return <h1 className={style.loading}>Loading Countries... </h1>;

  const renderPageButtons = () => {   //esta función se usa para generar los botones de página en función del número total de páginas y la página actual

    if (totalPages === 1) return null;

    const startPage = Math.max(0, Math.min(page - Math.floor(visiblePageButtons / 2), totalPages - visiblePageButtons));
    const endPage = Math.min(startPage + visiblePageButtons, totalPages);

    return Array.from({ length: endPage - startPage }).map((_, i) => {    //generamos los botones mediante el bucle map
      const pageNumber = startPage + i;
      const buttonClass = pageNumber === page ? style.selectedPageButton : style.pageButton;
      return (
        <button className={buttonClass} type="" key={pageNumber} onClick={() => setPage(pageNumber)}>
          {pageNumber + 1}
        </button>  //al hacer clic en un botón de página, se llama a la función setPage para actualizar la página actual
      );
    });
  };

  return (
    <div>
      <div className={style.pagination}>
        {page > 0 && (
          <button key={'<<'} className={style.pageButton} type="" onClick={() => setPage(0)}>
            {'<<'}
          </button>
        )}
        {renderPageButtons()}
        {page < totalPages - 1 && (
          <button key={'>>'} className={style.pageButton} type="" onClick={() => setPage(totalPages - 1)}>
            {'>>'}
          </button>
        )}
      </div>

      <div className={style.container}>
        {allcountries
          .slice(0 + page * countriesPerPage, countriesPerPage + page * countriesPerPage)  //la lista se segmenta según la página actual usando el método slice
          .map(({ id, name, continents, flags }) => {
            return (
              <React.Fragment key={id + ' ' + name}>
                <CountryCard id={id} name={name} continents={continents} flags={flags} />
              </React.Fragment> //la lista de países se muestra usando el componente countryCard
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;















// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import CountryCard from '../countryCard/countryCard';
// import style from './homePage.module.css';

// const countriesPerPage = 10;
// const visiblePageButtons = 5;

// const HomePage = () => {
//   const allcountries = useSelector((state) => state.country.allCountries);

//   const [totalPages, setTotalPages] = useState(0);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     setTotalPages(Math.ceil(allcountries.length / countriesPerPage));
//     setPage(localStorage.getItem('currentPage') || 0);
//   }, [allcountries]);

//   useEffect(() => {
//     localStorage.setItem('currentPage', page);
//   }, [page]);

//   if (allcountries.length === 0) return <h1 className={style.loading}>Loading Countries ...</h1>;

//   const renderPageButtons = () => {
//     if (totalPages === 1) return null; // No renderizar los botones de paginación si solo hay una página

//     const startPage = Math.max(0, Math.min(page - Math.floor(visiblePageButtons / 2), totalPages - visiblePageButtons));
//     const endPage = Math.min(startPage + visiblePageButtons, totalPages);

//     return Array.from({ length: endPage - startPage }).map((_, i) => {
//       const pageNumber = startPage + i;
//       const buttonClass = pageNumber === page ? style.selectedPageButton : style.pageButton; // Aplica estilos diferentes a la página seleccionada
//       return (
//         <button className={buttonClass} type="" key={pageNumber} onClick={() => setPage(pageNumber)}>
//           {pageNumber + 1}
//         </button>
//       );
//     });
//   };

//   return (
//     <div>
//       <div className={style.pagination}>
//         {page > 0 && (
//           <button key={'<<'} className={style.pageButton} type="" onClick={() => setPage(0)}>
//             {'<<'}
//           </button>
//         )}
//         {renderPageButtons()}
//         {page < totalPages - 1 && (
//           <button key={'>>'} className={style.pageButton} type="" onClick={() => setPage(totalPages - 1)}>
//             {'>>'}
//           </button>
//         )}
//       </div>

//       <div className={style.container}>
//         {allcountries
//           .slice(0 + page * countriesPerPage, countriesPerPage + page * countriesPerPage)
//           .map(({ id, name, continents, flags }) => {
//             return (
//               <React.Fragment key={id + ' ' + name}>
//                 <CountryCard id={id} name={name} continents={continents} flags={flags} />
//               </React.Fragment>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
