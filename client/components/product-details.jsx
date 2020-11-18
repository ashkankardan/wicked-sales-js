import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const url = `/api/products/${this.props.params.productId}`;
    fetch(url)
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
      })
      .catch(err => console.error(err));
  }

  render() {

    const FormatedPrice = () => {
      if (this.state.product.price) {
        const priceStr = this.state.product.price.toString();
        return priceStr.slice(0, -2) + '.' + priceStr.slice(-2);
      }
    };

    return this.state.product

      ? <div className={ 'product-details' }>
        <div onClick={ () => this.props.setView('catalog', null) } className="back-arrow"> {<i className="fas fa-arrow-left"></i>} Back to catalog</div>
        <div className="dt-top row">
          <img className="dt-image" src={this.state.product.image} alt={this.state.product.name}/>
          <div className="dt-info">
            <div className="dt-title"><h3>{this.state.product.name}</h3></div>
            <div className="dt-price">$
              <FormatedPrice />
            </div>
            <div className="dt-short-description">{this.state.product.shortDescription}</div>
            <div onClick={ () => this.props.addToCart(this.state.product) } className="add-btn"><button type="button" className="btn">Add to Cart</button></div>
          </div>
        </div>
        <div className="dt-description">{this.state.product.longDescription}</div>
      </div> : null;
  }

}
