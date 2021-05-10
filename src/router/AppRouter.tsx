import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import Dashboard from '../components/dashboard/dashboard';
import HeroDetail from "../components/hero-detail/hero-detail";
import HeroSearch from "../components/hero-search/hero-search";
import Heroes from '../components/heroes/heroes';

export const AppRouter = () => {
    return (
        <Router>

            <nav>
                <NavLink
                    activeClassName='active'
                    exact
                    to='/dashboard'> Dashboard </NavLink>
            </nav>

            <nav>
                <NavLink
                    activeClassName='active'
                    exact
                    to='/heroes'> Heroes </NavLink>
            </nav>

            <Switch>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path="/heroes" component={Heroes}></Route>
                <Route exact path="/hero-detail/:id" component={HeroDetail}></Route>
                <Route exact path="/hero-search" component={HeroSearch}></Route>
            </Switch>

        </Router>
    )
}
