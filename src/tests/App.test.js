import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import apiResponseStarWars from '../helpers/ApiStarWarsMock';
import StarWarsProvider from '../context/StarWarsProvider';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testando o componente <App />', () => {

  beforeEach(() => {
    const mockData = { results: apiResponseStarWars };
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('verifica se ele faz a requesição a API ', () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    expect(global.fetch).toBeCalledTimes(1);
  });
  it('verifica se as os inputs e botoes são renderizados na tela', () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const inputName = screen.getByTestId('name-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');
    const comparation = screen.getByTestId('comparison-filter');
    const buttonOrder = screen.getByTestId('column-sort-button');
    const columnOrder = screen.getByTestId('column-sort');
    const radios = screen.getByText(/ascesdentedescentende/i);
    const columnFilter = screen.getByTestId('column-filter');
    const removeAllFilters = screen.getByTestId('button-remove-filters');
    expect(inputName).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
    expect(comparation).toBeInTheDocument();
    expect(buttonOrder).toBeInTheDocument();
    expect(columnOrder).toBeInTheDocument();
    expect(radios).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(removeAllFilters).toBeInTheDocument();
    expect(inputName).toHaveValue('');
    expect(inputNumber).toHaveValue(0);
    expect(buttonFilter).toBeEnabled();
    expect(comparation).toBeEnabled();
    expect(buttonOrder).toBeEnabled();
    expect(columnOrder).toBeEnabled();
    expect(radios).toBeEnabled();
    expect(columnFilter).toBeEnabled();
    expect(removeAllFilters).toBeEnabled();
  })
  it('verifica se a tabela é renderiza normalmente com os planetas', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
   const name = await screen.findByRole('columnheader', { name: /name/i })
    const rotation = await screen.findByRole('columnheader', { name: /rotation period/i })
    const orbital = await screen.findByRole('columnheader', { name: /orbital period/i })
    const diameter = await screen.findByRole('columnheader', { name: /diameter/i })
    const climate = await screen.findByRole('columnheader', { name: /climate/i })
    const gravity = await screen.findByRole('columnheader', { name: /gravity/i })
    const terrain = await screen.findByRole('columnheader', { name: /terrain/i })
    const surface = await screen.findByRole('columnheader', { name: /surface water/i })
    const population = await screen.findByRole('columnheader', { name: /population/i })
    const films = await screen.findByRole('columnheader', { name: /films/i })
    const created = await screen.findByRole('columnheader', { name: /created/i })
    const edited = await screen.findByRole('columnheader', { name: /edited/i })
    const url = await screen.findByRole('columnheader', { name: /url/i })
    expect(name).toBeInTheDocument();
    expect(rotation).toBeInTheDocument();
    expect(orbital).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(climate).toBeInTheDocument();
    expect(gravity).toBeInTheDocument();
    expect(terrain).toBeInTheDocument();
    expect(surface).toBeInTheDocument();
    expect(population).toBeInTheDocument();
    expect(films).toBeInTheDocument();
    expect(created).toBeInTheDocument();
    expect(edited).toBeInTheDocument();
    expect(url).toBeInTheDocument();
  })
  it('verifica se os planetas são renderizados na tabela', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const table = await screen.findByRole('table')
    expect(table).toBeInTheDocument();
    const cells = await screen.findAllByRole('cell');
    expect(cells).toHaveLength(130);
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(11);
    const columnsTable = await screen.findAllByRole('columnheader');
    expect(columnsTable).toHaveLength(13);
    const planet = await screen.findByText(/Tatooine/i);
    expect(planet).toBeInTheDocument();
    const Orbital  = await screen.findByText(/304/i);
    expect(Orbital).toBeInTheDocument();
    const Climate = await screen.findByText(/arid/i);
    expect(Climate).toBeInTheDocument();
    const terrain = await screen.findByText(/desert/i);
    expect(terrain).toBeInTheDocument();
    const films = await screen.findByRole('cell', { name: /https:\/\/swapi\.dev\/api\/films\/1\/https:\/\/swapi\.dev\/api\/films\/3\/https:\/\/swapi\.dev\/api\/films\/4\/https:\/\/swapi\.dev\/api\/films\/5\/https:\/\/swapi\.dev\/api\/films\/6\//i })
    expect(films).toBeInTheDocument();
    const created = await screen.findByText(/2014-12-09T13:50:49\.641000Z/i);
    expect(created).toBeInTheDocument();
    const edited = await screen.findByText(/2014-12-20T20:58:18\.411000Z/i);
    expect(edited).toBeInTheDocument();
    const url = await screen.findByText(/https:\/\/swapi\.dev\/api\/planets\/1\//i);
    expect(url).toBeInTheDocument();
    const rotationPeriod1 = await screen.findAllByText(/23/i);
    expect(rotationPeriod1).toHaveLength(4);
    expect(rotationPeriod1[0]).toBeInTheDocument();
    const diameter1 = await screen.findByText(/10465/i);
    expect(diameter1).toBeInTheDocument();
    const gravity1 = await screen.findAllByText(/1 standard/i);
    expect(gravity1).toHaveLength(8);
    expect(gravity1[0]).toBeInTheDocument();
    const population = await screen.findAllByText(/200000/i);
    expect(population).toHaveLength(2);
    expect(population[0]).toBeInTheDocument();
  });
  it('verifica a filtagrem por nome', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const columnsTable = await screen.findAllByRole('columnheader');
    expect(columnsTable).toHaveLength(13);
    const tatooine = await screen.findByText(/Tatooine/i);
    expect(tatooine).toBeInTheDocument();
    const hoth = await screen.findByText(/Hoth/i);
    expect(hoth).toBeInTheDocument();
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'hoth');
    expect(nameInput).toHaveValue('hoth');
    expect(tatooine).not.toBeInTheDocument();
    expect(hoth).toBeInTheDocument();
    userEvent.clear(nameInput);
    expect(nameInput).toHaveValue('');
    expect(hoth).toBeInTheDocument();
    const newTatoine = await screen.findByText(/Tatooine/i);
    expect(newTatoine).toBeInTheDocument();
  })
  it('verifica se é possivel ordernar por ascendente ou descentende', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const buttonOrder = await screen.findByTestId('column-sort-button');
    expect(buttonOrder).toBeInTheDocument();
    const columnOrder = await screen.findByTestId('column-sort');
    expect(columnOrder).toBeInTheDocument();
    const radios = await screen.findAllByRole('radio');
    expect(radios).toHaveLength(2);
    userEvent.selectOptions(columnOrder, 'orbital_period');
    expect(columnOrder).toHaveValue('orbital_period');
    userEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
    userEvent.click(radios[1]);
    expect(radios[1]).toBeChecked();
    expect(radios[0]).not.toBeChecked();
    userEvent.click(buttonOrder);
    const allPlanets = await screen.findAllByRole('row');
    expect(allPlanets).toHaveLength(11);
    const firstPlanet = await screen.findByRole('cell', { name: /bespin/i })
    expect(firstPlanet).toBeInTheDocument();
    const lastPlanet = await screen.findByRole('cell', { name: /tatooine/i })
    expect(lastPlanet).toBeInTheDocument();
    userEvent.click(radios[0]);
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
    userEvent.click(buttonOrder);
    const allPlanets2 = await screen.findAllByRole('row');
    expect(allPlanets2).toHaveLength(11);
    const firstPlanet2 = await screen.findByRole('cell', { name: /tatooine/i })
    expect(firstPlanet2).toBeInTheDocument();
    const lastPlanet2 = await screen.findByRole('cell', { name: /bespin/i })
    expect(lastPlanet2).toBeInTheDocument();
  })
  it('verifica se é feito o filtro por maior que ', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const tatooine = await screen.findByText(/Tatooine/i);
    const bespin = await screen.findByText(/Bespin/i);
    expect(tatooine).toBeInTheDocument();
    const buttonFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(buttonFilter, 'population');
    expect(buttonFilter).toHaveValue('population');
    const comparation = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparation, 'maior que');
    expect(comparation).toHaveValue('maior que');
    const value = await screen.findByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '200000');
    expect(value).toHaveValue(200000);
   const button = await screen.findByRole('button', { name: /filtrar/i });
    userEvent.click(button);
    expect(tatooine).not.toBeInTheDocument();
    expect(bespin).toBeInTheDocument();
    const textFilter = await screen.findByText(/population maior que 200000/i)
    expect(textFilter).toBeInTheDocument();
  })
  it('verifica se é feito o filtro por menor que', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const tatooine = await screen.findByText(/Tatooine/i);
    const bespin = await screen.findByText(/Bespin/i);
    expect(tatooine).toBeInTheDocument();
    const buttonFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(buttonFilter, 'population');
    expect(buttonFilter).toHaveValue('population');
    const comparation = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparation, 'menor que');
    expect(comparation).toHaveValue('menor que');
    const value = await screen.findByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '300000');
    expect(value).toHaveValue(300000);
   const button = await screen.findByRole('button', { name: /filtrar/i });
    userEvent.click(button);
    expect(tatooine).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();
    const textFilter = await screen.findByText(/population menor que 300000/i)
    expect(textFilter).toBeInTheDocument();
  });
  it('veriica se é o feito o filtro por igual a', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const tatooine = await screen.findByText(/Tatooine/i);
    const bespin = await screen.findByText(/Bespin/i);
    expect(tatooine).toBeInTheDocument();
    const buttonFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(buttonFilter, 'population');
    expect(buttonFilter).toHaveValue('population');
    const comparation = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparation, 'igual a');
    expect(comparation).toHaveValue('igual a');
    const value = await screen.findByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '200000');
    expect(value).toHaveValue(200000);
   const button = await screen.findByRole('button', { name: /filtrar/i });
    userEvent.click(button);
    expect(tatooine).toBeInTheDocument();
    expect(bespin).not.toBeInTheDocument();
    const textFilter = await screen.findByText(/population igual a 200000/i)
    expect(textFilter).toBeInTheDocument();
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(2);
  })
  it('verifica se ao remover um filtro o estado inicial da aplicação é voltado', async () => {
    render(
      <StarWarsProvider>
        <App />
      </StarWarsProvider>
    );
    const tatooine = await screen.findByText(/Tatooine/i);
    expect(tatooine).toBeInTheDocument();
    const buttonFilter = await screen.findByTestId('column-filter');
    userEvent.selectOptions(buttonFilter, 'population');
    expect(buttonFilter).toHaveValue('population');
    const comparation = await screen.findByTestId('comparison-filter');
    userEvent.selectOptions(comparation, 'maior que');
    expect(comparation).toHaveValue('maior que');
    const value = await screen.findByTestId('value-filter');
    userEvent.clear(value);
    userEvent.type(value, '200000');
    expect(value).toHaveValue(200000);
   const button = await screen.findByRole('button', { name: /filtrar/i });
    userEvent.click(button);
    expect(tatooine).not.toBeInTheDocument();
    const textFilter = await screen.findByText(/population maior que 200000/i)
    expect(textFilter).toBeInTheDocument();
    const buttonRemove = await screen.findByRole('button', { name: /excluir/i })
    userEvent.click(buttonRemove);
    expect(textFilter).not.toBeInTheDocument();
    const newTatoine = await screen.findByText(/Tatooine/i);
    expect(newTatoine).toBeInTheDocument();
  })
  });
