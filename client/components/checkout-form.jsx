import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  handleChange(event) {
    const eName = event.target.name;
    const eValue = event.target.value;

    this.setState({
      [eName]: eValue
    });
  }

  render() {
    return (

      <div className={'checkout-form'}>
        <form onSubmit={ this.handleSubmit }>
          <div className="cart-heading"><h2>My Cart</h2></div>

          <label className="form-label" htmlFor="name">Name</label>
          <input value={ this.state.event } onChange={ this.handleChange } className="form-input" type="text" name="name" id="name" />

          <label className="form-label" htmlFor="creditCard">Credit Card</label>
          <input value={ this.state.event } onChange={ this.handleChange } className="form-input" type="text" name="creditCard" id="creditCard" />

          <label className="form-label" htmlFor="shippingAddress">Shipping Address</label>
          <textarea value={ this.state.event } onChange={ this.handleChange } className="form-input" name="shippingAddress" id="shippingAddress" cols="30" rows="10"></textarea>
          <div className="bottom-row row">

            <div onClick={ () => this.props.setView('catalog', null) } className="back-arrow col-6"> {<i className="fas fa-arrow-left"></i>} Continue Shopping</div>

            <div className="order-btn col-6"><button type="submit" className="btn btn-primary">Place Order</button></div>
          </div>

        </form>
      </div>
    );
  }
}
