import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DataOutput } from './components/dataoutput';
import { About } from './components/about';

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <About />
      </Route>
      <Route path="/search">
        <DataOutput />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
