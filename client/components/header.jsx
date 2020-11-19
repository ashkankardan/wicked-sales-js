import React from 'react';

export default function Header(props) {

  let cartDisplay;
  const CartCount = () => {
    if (props.cartItemCount <= 1) {
      cartDisplay = `${props.cartItemCount} Item`;
    } else {
      cartDisplay = `${props.cartItemCount} Items`;
    }
    return cartDisplay;
  };

  return (
    <div className={ 'header row' }>
      <div className="header-left col-6">

        <img className={ 'store-logo' }src="./images/the-picks-logo.png" alt="the picks logo"/>
        <div className={ 'store-name' }>
          The Picks
        </div>
      </div>
      <div className="header-right col-6">
        <div className="header-card-container cart-item-count" onClick={() => props.setView('cart', null)} >
          <CartCount className="header-card-container" />
          <i className="header-card-container cart-icon fas fa-shopping-cart"></i>
        </div>
      </div>
    </div>
  );
}
