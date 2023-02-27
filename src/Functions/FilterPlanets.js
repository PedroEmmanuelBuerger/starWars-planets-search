import { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

const FilterPlantes = () => {
  const { data, nameFilter, numericFilters } = useContext(starWarsContext);
  const planetsByFilteredName = data.filter((planet) => planet.name
    .toLowerCase().includes(nameFilter));

  const filteredByNumbers = planetsByFilteredName.filter((planet) => {
    if (numericFilters.length === 0) return true;
    const { column, comparison, value } = numericFilters[0];
    if (comparison === 'maior que') return Number(planet[column]) > Number(value);
    if (comparison === 'menor que') return Number(planet[column]) < Number(value);
    if (comparison === 'igual a') return Number(planet[column]) === Number(value);
    return planetsByFilteredName;
  });

  return filteredByNumbers;
};

export default FilterPlantes;
