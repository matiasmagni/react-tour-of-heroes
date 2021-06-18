import { screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import renderWithRouter from '../../__mocks__/renderWithRouter';
import HeroDetail from './HeroDetail';
import config from '../../config.json';
import heroesMock from '../../__mocks__/heroesMock';
import { IHero } from '../../types/hero';

const mockAxios = new MockAdapter(axios);
const hero: IHero = heroesMock[0];
const url: string = `/hero-detail/${hero.id}`;

jest.mock('react-router-dom', () => ({
  // use actual for all non-hook parts
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ heroId: 12 }),
}));

describe('Tests del componente HeroDetail.', () => {
  it('El componente HeroDetail se renderiza correctamente.', async () => {
    const spyAxiosGet = jest.spyOn(axios, 'get');
    mockAxios
      .onGet(`${config.API_URL.heroes}?id=${hero.id}`)
      .reply(200, [hero]);
    const tree = renderWithRouter(<HeroDetail />, url);

    await waitFor(() => {
      expect(screen.getByText(`${hero.name!} Details`)).toBeInTheDocument();
    });

    expect(spyAxiosGet).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
});
