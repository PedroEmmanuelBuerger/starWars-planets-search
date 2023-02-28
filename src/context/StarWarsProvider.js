import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './StarWarsContext';
import useFetch from '../hooks/useFetch';

function StarWarsProvider({ children }) {
  const columnsArr = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [columns, setColumns] = useState(columnsArr);

  const eraseColumn = async (par) => {
    const newColumns = columns.filter((col) => col !== par);
    await setColumns(newColumns);
  };

  const { fetchData } = useFetch();

  useEffect(() => {
    fetchData(setData);
  }, []);

  const handleChangeName = ({ target }) => {
    const targetToLower = target.value.toLowerCase();
    setNameFilter(targetToLower);
  };

  const handleChangeNumeric = (par) => {
    setNumericFilters([...numericFilters, par]);
    eraseColumn(par.column);
  };

  const removeCertainFilter = (par) => {
    const actualColum = par.column;
    const numericFiltersFiltered = numericFilters
      .filter((filter) => filter.column !== actualColum);
    setNumericFilters(numericFiltersFiltered);
    setColumns([...columns, actualColum]);
  };

  const deleteAllFilters = () => {
    setNumericFilters([]);
    setColumns(columnsArr);
  };

  const values = useMemo(() => ({ data,
    nameFilter,
    handleChangeNumeric,
    numericFilters,
    columns,
    removeCertainFilter,
    deleteAllFilters,
    handleChangeName }), [data, nameFilter, numericFilters, columns]);
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
