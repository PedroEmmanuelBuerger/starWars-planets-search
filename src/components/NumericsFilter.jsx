import React, { useState, useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function NumericsFilter() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const { handleChangeNumeric } = useContext(starWarsContext);
  const saveArray = () => {
    const array = {
      column,
      comparison,
      value,
    };
    handleChangeNumeric(array);
  };

  return (
    <form>
      <label htmlFor="column">
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          onClick={ (e) => setColumn(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="space">
        <select
          name="space"
          id="space"
          data-testid="comparison-filter"
          onClick={ (e) => setComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-filter"
          value={ value }
          onChange={ (e) => setValue(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => saveArray() }
      >
        Filtrar
      </button>
    </form>
  );
}
