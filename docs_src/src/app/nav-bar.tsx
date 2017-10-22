import { getPath, paths } from 'common/paths';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface INavBarProps {

}

export class NavBar extends React.Component<INavBarProps> {
  public render() {
    return (
      <div className='navbar fl sb'>
        <div className='fl'>
          <a href='#' className='logo-container'>
            <img src='./images/h-logo.svg' />
          </a>
        </div>
        <div className='fl'>
          <NavLink activeClassName='is-active' to={getPath(paths.rest)} className='link'>REST API</NavLink>
          <NavLink activeClassName='is-active' to={getPath(paths.client)} className='link'>JavaScript Client</NavLink>
        </div>
      </div>
    );
  }
}
