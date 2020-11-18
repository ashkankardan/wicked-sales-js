import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  let cartTotal = 0;
  let cartTotalStr;

  if (props.cartItemsArr.length === 0) {

    return (
      <div className="cart-items-container">
        <div onClick={ () => props.setView('catalog', null) } className="back-arrow"> {<i className="fas fa-arrow-left"></i>} Back to catalog</div>
        <div className="cart-heading"><h2>My Cart</h2></div>
        <div className="cart-empty-message"><h3>Your cart is empty</h3></div>
        <div className="cart-total">{ 'Item Total $0' }</div>
      </div>
    );

  } else {
    return (
      <div className="cart-items-container">
        <div onClick={ () => props.setView('catalog', null) } className="back-arrow"> {<i className="fas fa-arrow-left"></i>} Back to catalog</div>
        <div className="cart-heading"><h2>My Cart</h2></div>
        <div>

          {
            props.cartItemsArr.map(item => {
              cartTotal += item.price;
              cartTotalStr = cartTotal.toString().slice(0, -2) + '.' + cartTotal.toString().slice(-2);
              return <CartSummaryItem key={item.cartItemId} item={item} />;
            })

          }

        </div>

        <div className="bottom-row row">
          <div className="cart-total col-6">{ `Item Total $${cartTotalStr}` }</div>
          <div onClick={ () => props.setView('checkout', null) } className="checkout-btn col-6"><button type="button" className="btn">Checkout</button></div>
        </div>

      </div>
    );

  }

}
