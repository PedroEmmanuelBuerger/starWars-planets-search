import React from 'react';
import Table from '../components/Table';
import HeaderFilter from '../components/HeaderFilter';
import NumericsFilter from '../components/NumericsFilter';
import Filters from '../components/Filters';
import Order from '../components/Order';

export default function StarWars() {
  return (
    <div>
      <Filters />
      <Order />
      <HeaderFilter />
      <NumericsFilter />
      <Table />
    </div>
  );
}
