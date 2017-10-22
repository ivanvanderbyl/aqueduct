import * as React from 'react';

interface IClientProps {

}

export class Client extends React.Component<IClientProps> {
  public render() {
    return (
      <iframe src='./frames/typedoc/modules/_aqueduct_.aqueduct.html' className='iframe-frame' />
    );
  }
}
