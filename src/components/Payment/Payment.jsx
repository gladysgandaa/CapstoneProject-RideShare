import React, { Component } from "react";
import PayPalBtn from "./PayPalBtn";

export default class PaymentExample extends Component {
  paymentHandler = (details, data) => {
    /** Here you can call your backend API
        endpoint and update the database */
    console.log(details, data);
  };

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
