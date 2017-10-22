import { Client } from 'app/client/client';
import { Home } from 'app/home';
import { Rest } from 'app/rest/rest';
import { getPath, paths } from 'common/paths';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavBar } from './nav-bar';

interface IAppProps {

}

export class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path={getPath(paths.home)} component={Home} />
          <Route path={getPath(paths.rest)} component={Rest} />
          <Route path={getPath(paths.client)} component={Client} />
          <Redirect to={getPath(paths.home)} />
        </Switch>
      </div>
    );
  }
}
