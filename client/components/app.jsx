import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart });
      })
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const productStr = JSON.stringify(product);
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: productStr
    };

    fetch('/api/cart', req)
      .then(res => res.json())
      .then(data => {
        const newCartArr = this.state.cart.slice();
        newCartArr.push(data);
        this.setState({
          cart: newCartArr
        });
      })
      .catch(err => console.error(err));
  }

  setView(name, params) {
    const view = {
      name: name,
      params: params
    };
    this.setState({ view });
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {

    let viewEl;

    if (this.state.view.name === 'catalog') {
      viewEl = <ProductList setView={this.setView}/>;
    } else {
      viewEl = <ProductDetails addToCart={ this.addToCart } params={this.state.view.params} setView={this.setView} />;
    }

    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <div>
          <Header cartItemCount={ this.state.cart.length }/>
          {viewEl}
        </div>
    );
  }
}
