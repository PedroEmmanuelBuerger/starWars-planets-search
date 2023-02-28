import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Filters() {
  const { numericFilters, removeCertainFilter,
    deleteAllFilters } = useContext(starWarsContext);

  const removeFilter = (par) => {
    removeCertainFilter(par);
  };
  return (
    <section>
      {numericFilters.map((item) => (
        <div key={ item.column } data-testid="filter">
          <p>{`${item.column} ${item.comparison} ${item.value}`}</p>
          <button
            onClick={ () => removeFilter(item) }
          >
            Excluir
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => deleteAllFilters() }
      >
        Remover todas filtragens
      </button>
    </section>
  );
}
