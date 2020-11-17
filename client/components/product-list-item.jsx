import React from 'react';

function Product(props) {

  const priceStr = props.product.price.toString();
  const formattedPrice = priceStr.slice(0, -2) + '.' + priceStr.slice(-2);

  return (
    <div onClick={ () => props.setView('details', props.product) } className={ 'col-lg-4 col-md-6 product-card' }>
      <div className="product-inner-card">
        <div className="product-img-container">
          <img className={ 'product-image' } src={props.product.image} alt={props.product.name}/>
        </div>
        <div className="product-info-container">
          <div className={ 'product-title' }>
            <p>{props.product.name}</p>
          </div>
          <div className={ 'product-price' }>
            {`$${formattedPrice}`}
          </div>
          <div className={ 'product-short-description' }>
            {props.product.shortDescription}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductListItem(props) {
  return (
    <div className={ 'product-container row' }>
      {
        props.products.map(product => {
          return <Product key={product.productId} product={product} setView={ props.setView } />;
        })

      }
    </div>
  );
}
