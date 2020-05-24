import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

class PayPalBtn extends React.Component {
  render() {
    const { amount, onSuccess, currency } = this.props;

    return (
      <div>
        <PayPalButton
          amount={amount}
          currency={currency}
          onSuccess={(details, data) => onSuccess(details, data)}
          options={{
            clientId:
              "AWLF38Zq1sTR6AyaJCNOx4E6HHZ69U-3Nknqt8P06dabbSqsDyEcN7rgOxmJBX7Z6rWdhxhTcBuULt1D"
          }}
        />
      </div>
    );
  }
}
export default PayPalBtn;
