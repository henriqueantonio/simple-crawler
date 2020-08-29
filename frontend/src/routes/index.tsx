import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sites from '../pages/Sites';
import Site from '../pages/Site';
import CreateSite from '../pages/CreateSite';
import EditSite from '../pages/EditSite';

import Jobs from '../pages/Jobs';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Sites} />

    <Route path="/jobs" component={Jobs} />

    <Route path="/sites/create" component={CreateSite} />
    <Route path="/sites/:id/edit" component={EditSite} />
    <Route path="/site" component={Site} />
  </Switch>
);

export default Routes;
