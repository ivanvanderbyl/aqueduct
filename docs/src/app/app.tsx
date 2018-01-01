import { Account } from 'app/accounts/account';
import { Apply } from 'app/accounts/apply';
import { Client } from 'app/client/client';
import { Home } from 'app/home';
import { Login } from 'app/accounts/login';
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
      <div className='app'>
        <NavBar />
        <Switch>
          <Route path={getPath(paths.home)} component={Home} />
          <Route path={getPath(paths.rest)} component={Rest} />
          <Route path={getPath(paths.client)} component={Client} />
          <Route path={getPath(paths.apply)} component={Apply} />
          <Route path={getPath(paths.login)} component={Login} />
          <Route path={getPath(paths.account)} component={Account} />
          <Redirect to={getPath(paths.home)} />
        </Switch>
      </div>
    );
  }
}
