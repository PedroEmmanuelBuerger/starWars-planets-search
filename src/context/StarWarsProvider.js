import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const columnsArr = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const apiStarWars = 'https://swapi.dev/api/planets';

  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [columns, setColumns] = useState(columnsArr);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetch(apiStarWars);
      const resultJson = await results.json();
      const planets = resultJson.results;
      const planetsWithoutResidents = planets.map((planet) => {
        const { residents, ...planetWithoutResidents } = planet;
        return planetWithoutResidents;
      });
      setData(planetsWithoutResidents);
    };
    fetchData();
  }, []);

  const values = useMemo(() => ({
    data,
    setData,
    nameFilter,
    setNameFilter,
    numericFilters,
    setNumericFilters,
    columns,
    setColumns,
    columnsArr,
  }), [data, nameFilter, numericFilters, columns]);
  return (
    <starWarsContext.Provider value={ values }>
      {children}
    </starWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
