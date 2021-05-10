import React, { useState } from 'react'
import { IHero } from '../../types/hero';
import { Link } from 'react-router-dom';
import { helpHttp } from '../../helpers/helpHttp';
import { useEffect } from 'react';
import './heroes.css';

const Heroes = () => {

    const [heroes, setHeroes] = useState<IHero[]>([])
    const [inputNameValue, setInputNameValue] = useState<string>()

    let api = helpHttp();
    let url = 'http://localhost:5000/hero';

    useEffect(() => {
        api.get(url).then(res => {
            if (!res.err) {
                setHeroes(res)
            } else {
                setHeroes([]);
            }
        })
    }, [])

    const add = (): void => {

        const data = {
            id: Math.round(Math.random() * (100 - 1) + 1),
            name: inputNameValue
        }

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.post(url, options).then((res) => {
            if (!res.err) {
                setHeroes([...heroes, res]);
            } else {
                console.log('error');
            }
        });
    };

    const del = (id: number): void => {
        let isDelete = window.confirm(
            `¿Che chango vas a eliminar el heroe con el id '${id}'?`
        );

        if (isDelete) {
            let endpoint = `${url}/${id}`;
            let options = {
                headers: { "content-type": "application/json" },
            };

            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    let newData = heroes.filter(h => h.id !== id);
                    setHeroes(newData);
                } else {
                    console.log('error');
                }
            });
        } else {
            return;
        }
    };

    const handleInputNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputNameValue(e.target.value);
    }

    return (
        <>
            <h2>My Heroes</h2>

            <div>
                <label>Hero name: </label>
                <input onChange={handleInputNameChange} value={inputNameValue} placeholder="Hero name" />

                <button className="add-button" onClick={add}>
                    Add hero
  </button>
            </div>

            {heroes.map(hero => (
                <>
                    <ul className="heroes">
                        <li>
                            <Link to={`/hero-detail/${hero.id}`}>
                                <span className="badge">{hero.id}</span> {hero.name}
                            </Link>
                            <button className="delete" title="delete hero" onClick={() => del(hero.id)}>x</button>
                        </li>
                    </ul >

                </>
            ))}
        </>
    )
}

export default Heroes


