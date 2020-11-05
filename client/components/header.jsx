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

        <div className={ 'store-logo' }>
          $
        </div>
        <div className={ 'store-name' }>
          Wicked Sales
        </div>
      </div>
      <div className="header-right col-6">
        <div className="cart-item-count" onClick={() => props.setView('cart', null)} >
          <CartCount />
          <i className="cart-icon fas fa-shopping-cart"></i>
        </div>
      </div>
    </div>
  );
}
