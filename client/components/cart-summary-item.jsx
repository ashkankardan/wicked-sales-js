import React from 'react';

export default function CartSummaryItem(props) {
  const itemPrice = props.item.price;
  const formatedItemPrice = itemPrice.toString().slice(0, -2) + '.' + itemPrice.toString().slice(-2);

  return (
    <div className="cart-item-container row">
      <div className="card-row-left col-lg-5">
        <img className="cart-item-image" src={props.item.image} alt={props.item.name}/>
      </div>
      <div className="card-row-right col-lg-6">
        <div className="cart-item-name"><h3>{props.item.name}</h3></div>
        <div className="cart-item-price">{ `$${formatedItemPrice}` }</div>
        <div className="cart-item-short-description">{props.item.shortDescription}</div>
      </div>
    </div>
  );
}
