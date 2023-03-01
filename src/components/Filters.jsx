import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Filters() {
  const { numericFilters, setColumns, setNumericFilters,
    columnsArr } = useContext(starWarsContext);

  const removeCertainFilter = (par) => {
    const actualColum = par.column;
    const numericFiltersFiltered = numericFilters
      .filter((filter) => filter.column !== actualColum);
    setNumericFilters(numericFiltersFiltered);
    const columnsremoved = numericFiltersFiltered.map((filter) => filter.column);
    let newColum = [];
    if (columnsremoved.length === 0) {
      newColum = columnsArr;
    } else {
      newColum = columnsArr.filter((col) => !columnsremoved.includes(col));
    }
    setColumns(newColum);
  };

  const removeFilter = (par) => {
    removeCertainFilter(par);
  };

  const deleteAllFilters = () => {
    setNumericFilters([]);
    setColumns(columnsArr);
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
