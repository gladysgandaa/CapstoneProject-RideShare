import React, { Component } from "react";
import PayPalBtn from "./PayPalBtn";
import { browserHistory } from "react-router";
import { withRouter } from "react-router-dom";

export default class PaymentExample extends Component {
  paymentHandler = (details, data) => {
    /** Leave blank since we're not storing payments */
    console.log(details, data);
    this.goHome();
  };

  goHome() {
    this.props.history.push("/");
  }

  render() {
    const costPerHour = this.props.location.state.rentalCostPerHour;
    const durationOfRental = this.props.location.state.duration;
    const total = costPerHour * durationOfRental;
    return (
      <div>
        <PayPalBtn
          carId={this.props.location.state.carId}
          amount={total}
          currency={"USD"}
          onSuccess={this.paymentHandler}
        />
      </div>
    );
  }
}
