import './hero-detail.css';

import { useEffect, useState } from 'react';
import { useHistory, useParams, withRouter } from 'react-router';
import { IHero } from '../../types/hero';
import { helpHttp } from '../../helpers/helpHttp';
import { IRouteParams } from '../../types/routeParams';

const HeroDetail = () => {
    // useParams devuelve los parametros que se pasan por URL
    const { id } = useParams<IRouteParams>();
    const [hero, setHero] = useState<IHero[]>([]);
    const [inputValue, setInputValue] = useState<string>('')
    const history = useHistory();

    let api = helpHttp();
    let url = `http://localhost:5000/hero?id=${id}`;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const save = (): void => {
        let endpoint = `http://localhost:5000/hero/${id}`;
        let idNumber = Number(id);
        const data = {
            id: idNumber,
            name: inputValue,
        }
        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = hero.map((h) => (h.id === data.id ? data : h));
                setHero(newData);
            } else {
                console.log('error')
            }
        });
    };

    useEffect(() => {
        api.get(url).then(res => {
            if (!res.err) {
                setHero(res)
            } else {
                setHero([]);
            }
        })
    }, [])

    return (
        <>
            { hero &&
                <>
                    {hero.map(hero => (
                        <>
                            <h2>{hero.name} Details</h2>
                            <div><span>id: </span>{hero.id}</div>
                            <div>
                                <label>Hero name: </label>
                                <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Hero name" />
                            </div>
                            <button onClick={() => history.push('/dashboard')}>go back</button>
                            <button onClick={save}>save</button>
                        </>
                    ))}
                </>
            }
        </>

    );
}

export default withRouter(HeroDetail)


