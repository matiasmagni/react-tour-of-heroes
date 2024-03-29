import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IHero } from '../../types/hero';
import { heroesFilter } from '../../utils/filters';
import './HeroSearch.css';

const HeroSearch = ({ heroesList }: { heroesList: IHero[] }) => {
  const [heroes, setHeroes] = useState<IHero[]>(heroesList);
  const [heroesMock, setHeroesMock] = useState<IHero[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => setHeroes(heroesList), [heroesList]);

  const filterHeroes = (query: string = ''): void => {
    if (query) {
      setHeroesMock(heroes.filter((h: IHero) => heroesFilter(h, query)));
    } else {
      setHeroesMock(heroes);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    if (inputValue) filterHeroes(inputValue);
  };

  return (
    <>
      <label htmlFor="search">
        Hero Search:
        <input
          id="search"
          name="search"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Hero name"
        />
      </label>

      {heroesMock.map((hero: IHero) => (
        <ul key={`search-item-${hero.id}`} className="search-result">
          <li>
            <Link to={`/hero-detail/${hero.id}`}>{hero.name}</Link>
          </li>
        </ul>
      ))}
    </>
  );
};

export default HeroSearch;
