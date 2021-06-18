import React from 'react';
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Dashboard from '../components/Dashboard/Dashboard';
import HeroDetail from '../components/HeroDetail/HeroDetail';
import HeroSearch from '../components/HeroSearch/HeroSearch';
import Heroes from '../components/Heroes/Heroes';

const AppRouter = () => (
  <Router>
    <nav>
      <NavLink activeClassName="active" exact to="/dashboard">
        Dashboard
      </NavLink>
    </nav>

    <nav>
      <NavLink activeClassName="active" exact to="/heroes">
        Heroes
      </NavLink>
    </nav>

    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/heroes" component={Heroes} />
      <Route exact path="/hero-detail/:heroId" component={HeroDetail} />
      <Route exact path="/hero-search" component={HeroSearch} />
    </Switch>
  </Router>
);

export default AppRouter;
