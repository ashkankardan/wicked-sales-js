import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Modal from './modal';
import Footer from './footer';
import Banner from './banner';
import Spinner from './spinner';

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
      cart: [],
      catalogModal: true,
      checkoutModal: true
    };

    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.hideCatalogModal = this.hideCatalogModal.bind(this);
    this.hideCheckoutModal = this.hideCheckoutModal.bind(this);
  }

  hideCatalogModal() {
    this.setState({
      catalogModal: false
    });
  }

  hideCheckoutModal() {
    this.setState({
      checkoutModal: false
    });
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

  placeOrder(paymentInfo) {

    const paymentInfoStr = JSON.stringify(paymentInfo);
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: paymentInfoStr
    };

    fetch('/api/orders', req)
      .then(res => res.json())
      .then(data => {
        const newViewObj = { name: 'catalog', params: {} };
        this.setState({
          cart: [],
          view: newViewObj
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
      if (this.state.catalogModal) {
        viewEl =
        <div className="main">
          <Banner />
          <Modal hideCatalogModal={this.hideCatalogModal} view={this.state.view.name}/>
        </div>;
      } else {
        viewEl =
        <div className="main">
          <Banner />
          <ProductList setView={this.setView}/>
        </div>;
      }
    } else if (this.state.view.name === 'details') {
      viewEl =
      <div className="main">
        <ProductDetails addToCart={ this.addToCart } params={this.state.view.params} setView={this.setView} />;
      </div>;
    } else if (this.state.view.name === 'cart') {
      viewEl =
      <div className="main">
        <CartSummary cartItemsArr={this.state.cart} setView={this.setView} />;
      </div>;
    } else if (this.state.view.name === 'checkout') {

      if (this.state.checkoutModal) {
        viewEl = <div className="main">
          <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} />;
          <Modal hideCheckoutModal={this.hideCheckoutModal} view={this.state.view.name}/>
        </div>;
      } else {
        viewEl = <div className="main">
          <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} />;
        </div>;
      }
    }

    return (
      this.state.isLoading
        ? <Spinner />
        : <div>
          <Header cartItemCount={ this.state.cart.length } setView={this.setView} />
          {viewEl}
          <Footer />

        </div>
    );
  }
}
