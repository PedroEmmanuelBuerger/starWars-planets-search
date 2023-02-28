import React, { useState, useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Order() {
  const { orderData } = useContext(starWarsContext);
  const [columnSe, setColumnSe] = useState('population');
  const [order, setOrder] = useState('');

  const saveOrder = () => {
    const array = {
      order: {
        column: columnSe,
        sort: order,
      },
    };
    orderData(array);
  };
  return (
    <form>
      <label htmlFor="order">
        <select
          name="order"
          id="order"
          data-testid="column-sort"
          onClick={ (e) => setColumnSe(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="order">
        <input
          type="radio"
          name="order"
          value="ASC"
          data-testid="column-sort-input-asc"
          onClick={ (e) => setOrder(e.target.value) }
        />
        ascesdente
        <input
          type="radio"
          name="order"
          value="DESC"
          data-testid="column-sort-input-desc"
          onClick={ (e) => setOrder(e.target.value) }
        />
        descentende
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => saveOrder() }
      >
        Ordenar
      </button>
    </form>
  );
}
