import React from 'react';

function Product(props) {
  return (
    <div className={ 'col-4 product-card' }>
      <img className={ 'product-image' } src={props.product.image} alt={props.product.name}/>
      <div className={ 'product-title' }>
        <p>{props.product.name}</p>
      </div>
      <div className={ 'product-price' }>
        {props.product.price}
      </div>
      <div className={ 'product-short-description' }>
        {props.product.shortDescription}
      </div>
    </div>
  );
}

export default function ProductListItem(props) {
  return (
    <div className={ 'container row' }>
      {
        props.products.map(product => {
          return <Product key={product.productId} product={product} />;
        })

      }
    </div>
  );
}
