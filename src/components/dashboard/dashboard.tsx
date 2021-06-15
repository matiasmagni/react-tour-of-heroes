import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IHero } from '../../types/hero';
import HeroSearch from '../hero-search/hero-search';
import './dashboard.css';

const url = 'http://localhost:5000/hero';

const Dashboard = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setHeroes(res.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>Top Heroes</h2>
      {heroes.length > 0 && (
        <div className="heroes-menu">
          {heroes.map((hero: IHero) => (
            <Link key={`hero-${hero.id}`} to={`/hero-detail/${hero.id}`}>
              {hero.name}
            </Link>
          ))}
        </div>
      )}

      <HeroSearch heroesList={heroes} />
    </>
  );
};

export default Dashboard;
