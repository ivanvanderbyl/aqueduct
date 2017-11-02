import { getPath, paths } from 'common/paths';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './nav-bar.scss';

interface INavBarProps {

}

@observer
export class NavBar extends React.Component<INavBarProps> {
  @observable private menuActive = false;

  public render() {
    return (
      <div className='navbar fl sb'>
        <div className='fl'>
          <a href='#' className='logo-container'>
            <img src='./images/dark-logo.svg' style={{ width: '150px' }} />
          </a>
        </div>
        <div className='fl navbar-menu'>
          <NavLink activeClassName='is-active' to={getPath(paths.rest)} className='link'>REST API</NavLink>
          <NavLink activeClassName='is-active' to={getPath(paths.client)} className='link'>JavaScript Client</NavLink>
        </div>
        <div className='navbar-mobile-menu'>
          <i className='fa fa-bars' onClick={this.onClickMenu} />
          {this.menuActive && <div className='link-list'>
            <NavLink activeClassName='is-active' to={getPath(paths.rest)} className='link'>REST API</NavLink>
            <NavLink activeClassName='is-active' to={getPath(paths.client)} className='link'>JavaScript Client</NavLink>
          </div>}
        </div>
      </div>
    );
  }

  private readonly onClickMenu = () => this.menuActive = !this.menuActive;
}
