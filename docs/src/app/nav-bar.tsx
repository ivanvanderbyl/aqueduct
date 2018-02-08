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
            <img src='./images/dark-logo.svg' style={{ width: '150px', height: '80px' }} />
          </a>
        </div>
        <div className='fl navbar-menu'>
          <a className='link' href='/rest.html'>Rest API</a>
          <NavLink activeClassName='is-active' to={getPath(paths.events)} className='link'>Events API</NavLink>
          <a className='link' href='/client/index.html'>JavaScript Client</a>
        </div>
        <div className='navbar-mobile-menu'>
          <i className='fa fa-bars' onClick={this.onClickMenu} />
          {this.menuActive && <div className='link-list'>
            <a className='link' href='/rest.html'>Rest API</a>
            <a className='link' href='/client/index.html'>JavaScript Client</a>
            <NavLink activeClassName='is-active' to={getPath(paths.events)} onClick={this.onClickMobileMenuItem} className='link'>Events API</NavLink>
          </div>}
        </div>
      </div>
    );
  }

  private readonly onClickMenu = () => this.menuActive = !this.menuActive;

  private readonly onClickMobileMenuItem = () => {
    this.menuActive = false;
  }
}
