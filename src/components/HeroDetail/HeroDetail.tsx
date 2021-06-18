import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { IHero } from '../../types/hero';
import { IRouteParams } from '../../types/routeParams';
import config from '../../config.json';
import './HeroDetail.css';

const HeroDetail = () => {
  // useParams devuelve los parametros que se pasan por URL
  const { heroId }: IRouteParams = useParams();
  const [hero, setHero] = useState<IHero>();
  const [inputValue, setInputValue] = useState<string>('');
  const history = useHistory();
  const url = `${config.API_URL.heroes}?id=${heroId}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const save = async () => {
    const endpoint = `${config.API_URL.heroes}/${heroId}`;

    const data = {
      id: Number(heroId),
      name: inputValue,
    };

    try {
      await axios.put(endpoint, data);
      setHero(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let res: AxiosResponse<any> | any = null;

      try {
        res = await axios.get(url);
        if (res) setHero(res.data[0]);
      } catch (error) {
        console.log(error, res);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {hero && (
        <>
          <h2>{hero.name} Details</h2>
          <div>
            <span>id: </span>
            {hero.id}
          </div>
          <div>
            <label htmlFor="heroInput">
              Hero name:
              <input
                id="heroInput"
                name="heroInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Hero name"
              />
            </label>
          </div>
          <button type="button" onClick={() => history.push('/dashboard')}>
            go back
          </button>
          <button type="submit" onClick={save}>
            save
          </button>
        </>
      )}
    </>
  );
};

export default HeroDetail;
