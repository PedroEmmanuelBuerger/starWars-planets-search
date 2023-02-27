import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './StarWarsContext';
import useFetch from '../hooks/useFetch';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const { fetchData } = useFetch();

  const handleChangeName = ({ target }) => {
    const targetToLower = target.value.toLowerCase();
    setNameFilter(targetToLower);
  };

  const handleChangeNumeric = (par) => {
    setNumericFilters([...numericFilters, par]);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);
  const values = useMemo(() => ({ data,
    nameFilter,
    handleChangeNumeric,
    numericFilters,
    handleChangeName }), [data, nameFilter, numericFilters]);
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
