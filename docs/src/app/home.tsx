import * as React from 'react';
import './home.scss';

interface IHomeProps {

}

export class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div className='home p-bottom'>
        <div className='top'>
          <div className='section-container header-container'>
            <h1>A protocol and tool set for sharing liquidity</h1>
            <p>
              ERC dEX believes that the future of decentralized exchange depends on deep liquidity pools and robust relayer networks.
                We've developed Aqueduct to be an <a href='https://github.com/ercdex/aqueduct'>open source</a> protocol and tool set to make integration and liquidity sharing simple.
              </p>
          </div>
        </div>
        <div className='getting-started section-container fe' style={{ display: 'flex' }}>
          <div>
            <h1>Getting Started</h1>
            <p>Get instant access to decentralized global liquidity</p>
          </div>
          <div className='icon-container'>
            <i className='fa fa-arrow-circle-down' />
          </div>
        </div>

        <div className='section-container blue-container fl sb'>
          <div className='half-width'>
            <h1>JavaScript SDK Quick Start</h1>
            <p className='half-width'>
              We've developed a best in class developer toolset that makes integrating with our APIs and Event feeds simple.
            </p>
          </div>
          <div className='half-width fl c vc'>
            <a href='https://github.com/ercdex/aqueduct#overview' target='_blank' className='button'>Get the SDK</a>
          </div>
        </div>

        <div className='section-container rest-container fl sb'>
          <div className='half-width fl c vc'>
            <a href='/rest.html' target='_blank' className='button'>Review the Docs</a>
          </div>
          <div className='half-width'>
            <h1>REST API Documentation</h1>
            <p className='half-width'>
              Our API provides full access to shared networked liquidity, historical data, and more
            </p>
          </div>
        </div>

        <div className='section-container blue-container fl sb'>
          <div className='half-width'>
            <h1>WebSocket Events API</h1>
            <p className='half-width'>
              Markets are an event-driven domain. We publish the latest updates to our network using a simple WebSockets API.
            </p>
          </div>
          <div className='half-width fl c vc'>
            <a href='/#/events' target='_blank' className='button'>Learn about Events API</a>
          </div>
        </div>
      </div>
    );
  }
}
