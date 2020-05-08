import React, { Component } from "react";
import PayPalButton from "./PayPalButton";
export default class Payment extends Component {
  paymentHandler = (details, data) => {
    /** Here you can call your backend API
        endpoint and update the database */
    console.log(details, data);
  };
  render() {
    return (
      <div>
        <div>Online Payment Demo</div>
        <PayPalButton
          amount={200}
          currency={"USD"}
          onSuccess={this.paymentHandler}
        />
      </div>
    );
  }
}
