import React, { useContext } from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext'
import configEnv from '../config'
import '../styles/components/Payment.css';

const Payments = () => {
    const { state, addNewOrder } = useContext(AppContext)
    const { cart, buyer } = state
    const navigate = useNavigate()

    const paypalOptions = {
        clientId: configEnv.clientIdPaypal,
        currency: 'USD',
        intent: 'capture'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
    }

    const handleSumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price
        const sum = cart.reduce(reducer, 0)
        return sum
    }

    const handlePaymentSuccess = (data) => {
        console.log("handlePaymentSuccess", data)
        if(data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                products: cart.products ,
                payment: data
            } 
            addNewOrder(newOrder);
            navigate('/checkout/success')
        }
    }
    

    return (
        <div className="Payment">
        <div className="Payment-content">
            <h3>Resumen del pedido:</h3>
            {cart.map((item) => (
                <div className="Payment-item" key={item.title}>
                    <div className="Payment-element">
                        <h4>{item.title}</h4>
                        <span>{`$ ${item.price}`}</span>
                    </div>
                </div>    
            ))}
            <div className="Payment-button">
                <PayPalButton 
                    paypalOpyions={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={handleSumTotal()}
                    onPaymentStart={() => console.log("start paypal")}
                    onPaymentSuccess={data => handlePaymentSuccess(data)}
                    onPaymentError={error => console.log(error)}
                    onPaymentCancel={data => console.log(data)}

                />
            </div>
        </div>
        <div></div>
        </div>
    );
};

export default Payments;