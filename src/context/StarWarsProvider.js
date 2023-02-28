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

  const eraseColumn = (par) => {
    const newColumns = columns.filter((col) => col !== par);
    setColumns(newColumns);
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

  const orderData = (OrderInformations) => {
    const { order } = OrderInformations;
    const { column, sort } = order;
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      if (sort === 'ASC') {
        return a[column] - b[column];
      }
      return b[column] - a[column];
    });
    const reSortWithUnkownAtEnd = sortedData.sort((a, b) => {
      const magicNumber = -1;
      if (a[column] === 'unknown') return 1;
      if (b[column] === 'unknown') return magicNumber;
      return 0;
    });
    setData(reSortWithUnkownAtEnd);
  };

  const values = useMemo(() => ({ data,
    nameFilter,
    handleChangeNumeric,
    numericFilters,
    columns,
    removeCertainFilter,
    deleteAllFilters,
    orderData,
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
