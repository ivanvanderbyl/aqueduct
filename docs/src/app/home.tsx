import * as React from 'react';
import './home.scss';

interface IHomeProps {

}

export class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div className='home p-bottom'>
        <div className='outer-container'>
          <div className='top'>
            <div className='header-container'>
              <h1>A protocol and tool set for sharing liquidity</h1>
              <p>
                ERC dEX believes that the future of decentralized exchange depends on deep liquidity pools and robust relayer networks.
                We've developed Aqueduct to be an <a href='https://github.com/ercdex/aqueduct'>open source</a> protocol and tool set to make integration and liquidity sharing simple.
            </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

{/* <div className='banner'>
              <img src='./images/light-logo.svg' style={{ width: '320px' }} />
            </div>
            <div className='inner-container'>
              <h1>A protocol and tool set for sharing liquidity</h1>
              <p>
                ERC dEX believes that the future of decentralized exchange depends on deep liquidity pools and robust relayer networks.
                We've developed Aqueduct to be an <a href='https://github.com/ercdex/aqueduct'>open source</a> protocol and tool set to make integration and liquidity sharing simple.
              </p>
              <p>If you would like to apply for fee sharing or fee rebates, please <a href='mailto:partners@ercdex.com'>email us</a> with details on your intended usage.</p>
              <h2>Installation</h2>
              <code>npm install aqueduct --save</code>
              <h2>Examples</h2>
              <p>You can find example implementations in the <code>src/examples</code> directory of <a href='https://github.com/ercdex/aqueduct'>the Aqueduct Github repository</a></p>
              <div className='fl sb button-bar'>
                <a className='link' href='/rest.html'>Rest API</a>
                <a className='link' href='/client.html'>JavaScript Client</a>
              </div>
            </div> */}
