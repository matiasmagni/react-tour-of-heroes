import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { IHero } from '../../types/hero';
import './heroes.css';

const url = 'http://localhost:5000/hero';

const Heroes = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [inputNameValue, setInputNameValue] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setHeroes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const add = async () => {
    let res: AxiosResponse<any> | any = null;

    const data: IHero = {
      id: Math.round(Math.random() * (100 - 1) + 1),
      name: inputNameValue,
    };

    try {
      res = await axios.post(url, data);
      setHeroes([...heroes, res.data]);
    } catch (error) {
      console.error(error, res.data);
    }
  };

  const del = async (id: number) => {
    let res: AxiosResponse<any> | any = null;

    const isDelete = window.confirm(
      `¿Che chango vas a eliminar el heroe con el id '${id}'?`,
    );

    if (isDelete) {
      const endpoint = `${url}/${id}`;

      try {
        res = await axios.delete(endpoint);
        const newData = heroes.filter((h) => h.id !== id);
        setHeroes(newData);
      } catch (error) {
        console.error(error, res.data);
      }
    }
  };

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputNameValue(event.target.value);
  };

  return (
    <>
      <h2>My Heroes</h2>
      <div>
        <label htmlFor="name">
          Hero name:
          <input
            id="name"
            name="name"
            onChange={handleInputNameChange}
            value={inputNameValue}
            placeholder="Hero name"
          />
        </label>
        <button type="button" className="add-button" onClick={add}>
          Add hero
        </button>
      </div>
      {heroes.map((hero: IHero) => (
        <ul key={`myhero-${hero.id}`} className="heroes">
          <li>
            <Link to={`/hero-detail/${hero.id}`}>
              <span className="badge">{hero.id}</span> {hero.name}
            </Link>
            <button
              type="button"
              className="delete"
              title="delete hero"
              onClick={() => del(hero.id)}
            >
              x
            </button>
          </li>
        </ul>
      ))}
    </>
  );
};

export default Heroes;
