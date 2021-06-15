import React from 'react';
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import Dashboard from '../components/dashboard/dashboard';
import HeroDetail from '../components/hero-detail/hero-detail';
import HeroSearch from '../components/hero-search/hero-search';
import Heroes from '../components/heroes/heroes';

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
      <Route exact path="/hero-detail/:id" component={HeroDetail} />
      <Route exact path="/hero-search" component={HeroSearch} />
    </Switch>
  </Router>
);

export default AppRouter;
