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
