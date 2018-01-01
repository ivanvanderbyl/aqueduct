import { getPath, paths } from 'common/paths';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

interface IHomeProps {

}

export class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div className='home'>
        <div className='outer-container'>
          <div className='content'>
            <div className='banner'>
              <img src='./images/light-logo.svg' style={{ width: '320px' }} />
            </div>
            <div className='inner-container'>
              <h1>A protocol and tool set for sharing liquidity</h1>
              <p>
                ERC dEX believes that the future of decentralized exchange depends on deep liquidity pools and robust relayer networks.
                We've developed a protocol and tools to make integration easy and simple.  Aqueduct allows users to query the ERC dEX order book,
                submit orders, be notified of events, and even share in transaction fees.
              </p>
              <p>
                If you would like to use Aqueduct, please <Link to={getPath(paths.apply)}>apply here</Link> for an API key.  If you have already applied,
                and are awaiting results, or you have an API key and wish to review your account, <Link to={getPath(paths.login)}>login here</Link>.
              </p>
              <div className='fl sb button-bar'>
                <Link to={getPath(paths.rest)} className='link'>REST API</Link>
                <Link to={getPath(paths.client)} className='link'>JavaScript Client</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
