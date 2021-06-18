import { render, screen, waitFor } from '@testing-library/react';
import HeroSearch from './HeroSearch';
import heroesMock from '../../__mocks__/heroesMock';

describe('Tests del componente HeroSearch.', () => {
  it('El componente HeroSearch se renderiza correctamente.', () => {
    const tree = render(<HeroSearch heroesList={heroesMock} />);
    expect(tree).toMatchSnapshot();
  });
});
