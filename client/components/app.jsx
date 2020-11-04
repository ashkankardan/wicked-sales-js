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
      }
    };

    this.setView = this.setView.bind(this);
  }

  setView(params) {
    let view;
    if (this.state.view.name === 'catalog') {
      view = {
        name: 'details',
        params: { productId: params.productId }
      };
      this.setState({ view });
    } else {
      view = {
        name: 'catalog',
        params: null
      };
      this.setState({ view });
    }
  }

  componentDidMount() {
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
      viewEl = <ProductDetails params={this.state.view.params} setView={this.setView} />;
    }

    return (
      this.state.isLoading
        ? <h1>Testing connections...</h1>
        : <div>
          <Header />
          {viewEl}
        </div>
    );
  }
}
