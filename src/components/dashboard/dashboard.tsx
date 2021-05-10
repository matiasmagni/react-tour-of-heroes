import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { helpHttp } from '../../helpers/helpHttp';
import { IHero } from '../../types/hero';
import HeroSearch from '../hero-search/hero-search';
import './dashboard.css';

const Dashboard = () => {

    const [heroes, setHeroes] = useState<IHero[]>([])

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
    }, []);

    return (
        <>
            <h2>Top Heroes</h2>
            <div className="heroes-menu">
                {heroes.map(hero => (
                    <Link
                        to={`/hero-detail/${hero.id}`}> {hero.name} </Link>
                ))}
            </div>

            <HeroSearch></HeroSearch>

        </>
    );

}

export default Dashboard
