import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function HeaderFilter() {
  const { setNameFilter } = useContext(StarWarsContext);

  const handleChangeName = ({ target }) => {
    const targetToLower = target.value.toLowerCase();
    setNameFilter(targetToLower);
  };

  return (
    <main>
      <form>
        <label htmlFor="filter">
          <input
            type="text"
            name="filter"
            data-testid="name-filter"
            onChange={ (e) => handleChangeName(e) }
          />
        </label>
      </form>
    </main>
  );
}
