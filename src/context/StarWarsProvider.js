import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './StarWarsContext';
import useFetch from '../hooks/useFetch';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const { fetchData } = useFetch();

  const handleChangeName = ({ target }) => {
    setNameFilter(target.value);
  };

  useEffect(() => {
    fetchData(setData);
  }, []);
  const values = useMemo(() => ({ data,
    nameFilter,
    handleChangeName }), [data, nameFilter]);
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
