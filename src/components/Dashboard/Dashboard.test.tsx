import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderWithRouter from '../../__mocks__/renderWithRouter';
import Dashboard from './Dashboard';
import config from '../../config.json';
import heroesMock from '../../__mocks__/heroesMock';
import { IHero } from '../../types/hero';

const mockAxios = new MockAdapter(axios);

describe('Tests del componente Dashboard.', () => {
  it('El componente Dashboard se renderiza correctamente.', async () => {
    const spyAxiosGet = jest.spyOn(axios, 'get');
    const tree = renderWithRouter(<Dashboard />, '/dashboard');
    mockAxios.onGet(config.API_URL.heroes).reply(200, heroesMock);

    await waitFor(() => {
      heroesMock.forEach((hero: IHero) => {
        expect(screen.getByText(hero.name!)).toBeInTheDocument();
      });
    });

    expect(spyAxiosGet).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
