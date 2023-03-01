import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import apiResponseStarWars from '../helpers/ApiStarWarsMock';

describe('Testando o componente <App />', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(apiResponseStarWars),
    }));
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Teste se o componente <App /> é renderizado', () => {
    render(<App />);
  });
  });
