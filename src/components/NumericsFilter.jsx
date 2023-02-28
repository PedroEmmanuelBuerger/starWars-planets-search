import React, { useState, useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function NumericsFilter() {
  const { columns } = useContext(starWarsContext);
  const { handleChangeNumeric } = useContext(starWarsContext);
  const [column, setColumn] = useState(columns[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const saveArray = () => {
    const array = {
      column,
      comparison,
      value,
    };
    handleChangeNumeric(array);
    const filteredColumns = columns.filter((item) => item !== column);
    setColumn(filteredColumns[0]);
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
          {columns.map((item) => (
            <option key={ item } value={ item }>{item}</option>
          ))}
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
        onClick={ () => {
          saveArray();
        } }
      >
        Filtrar
      </button>
    </form>
  );
}
