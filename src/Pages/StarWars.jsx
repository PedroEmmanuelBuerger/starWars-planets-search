import React from 'react';
import Table from '../components/Table';
import HeaderFilter from '../components/HeaderFilter';
import NumericsFilter from '../components/NumericsFilter';

export default function StarWars() {
  return (
    <div>
      <HeaderFilter />
      <NumericsFilter />
      <Table />
    </div>
  );
}
