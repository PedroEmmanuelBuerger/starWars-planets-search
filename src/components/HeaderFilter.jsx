import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function HeaderFilter() {
  const { handleChangeName } = useContext(StarWarsContext);
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
