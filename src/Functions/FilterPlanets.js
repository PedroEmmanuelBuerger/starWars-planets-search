import { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

const FilterPlantes = () => {
  const { data, nameFilter } = useContext(starWarsContext);
  const planets = data.filter((planet) => planet.name.includes(nameFilter));
  return planets;
};

export default FilterPlantes;
