import { heroesFilter } from './filters';
import { IHero } from '../types/hero';
import heroesMock from '../__mocks__/heroesMock';

const validValues: any = {
  queries: ['pep', 'bomba', 'dy', 'ma'],
};

const expectedValues: any = {
  queries: [
    [heroesMock[0]],
    [heroesMock[1]],
    [heroesMock[5]],
    [heroesMock[3], heroesMock[7]],
  ],
};

describe('Tests de filtros.', () => {
  it('heroesFilter devuelve valores correctos al pasarle parametros validos.', () => {
    let filteredHeroes: any[] = [];

    validValues.queries.forEach((query: string, i: number) => {
      filteredHeroes = heroesMock.filter((h: IHero) => heroesFilter(h, query));

      expect(JSON.stringify(filteredHeroes)).toBe(
        JSON.stringify(expectedValues.queries[i]),
      );
    });
  });
});
