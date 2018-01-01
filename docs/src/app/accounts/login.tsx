import * as React from 'react';
import './login.scss';

interface ILoginProps {

}

export class Login extends React.Component<ILoginProps> {
  public render() {
    return (
      <div className='login'>
        <div className='outer-container'>
          <div className='content'>
            <div className='banner'>
              <img src='./images/light-logo.svg' style={{ width: '320px' }} />
            </div>
            <div className='inner-container'>
              <h1>Login</h1>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
