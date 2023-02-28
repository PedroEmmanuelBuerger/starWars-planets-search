import React from 'react';
import Table from '../components/Table';
import HeaderFilter from '../components/HeaderFilter';
import NumericsFilter from '../components/NumericsFilter';
import Filters from '../components/Filters';

export default function StarWars() {
  return (
    <div>
      <HeaderFilter />
      <Filters />
      <NumericsFilter />
      <Table />
    </div>
  );
}
