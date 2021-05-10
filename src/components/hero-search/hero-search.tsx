import { Link } from 'react-router-dom';
import './hero-search.css';
import { useEffect, useState } from 'react';
import { IHero } from '../../types/hero';
import { helpHttp } from '../../helpers/helpHttp';

const HeroSearch = () => {

    const [heroes, setHeroes] = useState<IHero[]>([]);
    const [heroesMock, setHeroesMock] = useState<IHero[]>([])
    const [inputValue, setInputValue] = useState<string>();

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
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
        if (inputValue) filterHeroes(inputValue)
    }

    const filterHeroes = (query: string = ''): void => {
        if (query) {
            setHeroesMock(heroes.filter(h =>
                h.name &&
                h.name.toLowerCase().indexOf(query!.toLowerCase()) > -1
            ));
        } else {
            setHeroesMock(heroes);
        }
    }

    return (
        <>
            <label>Hero Search</label>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Hero name" />
            {heroesMock.map(hero => (
                <ul className="search-result">
                    <li>
                        <Link to={`/hero-detail/${hero.id}`}>
                            {hero.name}
                        </Link>
                    </li>
                </ul>

            ))}

        </>
    )
}

export default HeroSearch
