import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className={ 'header' }>
        <div className={ 'store-logo' }>
          $
        </div>
        <div className={ 'store-name' }>
          Wicked Sales
        </div>
      </div>
    );
  }
}
