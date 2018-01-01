import * as React from 'react';
import './apply.scss';

interface IAccountProps {

}

export class Account extends React.Component<IAccountProps> {
  public render() {
    return (
      <div className='account'>
        <div className='outer-container'>
          <div className='content'>
            This is the account info
          </div>
        </div>
      </div>

    );
  }
}
