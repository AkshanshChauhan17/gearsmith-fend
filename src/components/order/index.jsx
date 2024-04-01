import { useState } from "react"
import url_main from "../../functions/url"
import logo from "../../assets/images/gearsmith-logo.webp"
import { AiOutlineLoading } from "react-icons/ai"

export default function PaymentForm() {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        if(!res) {
            alert("Razorpay SDK failed to load, Are you online?")
            return
        }

        try {
            const response = await fetch(url_main + 'order/create_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 1000
                })
            })

            const result = await response.json()

            if(!result) {
                alert("Server error. Are you online")
                return
            }

            const {amount, id: order_id, currency} = result

            var options = {
                key: "rzp_test_cWx0FiWY7TRc5L",
                amount: amount.toString(),
                currency: currency,
                name: "Akshansh",
                description: "test transaction",
                image: {logo},
                order_id: order_id,
                handler: async function (response) {
                    var data = {
                        orderCreationId: order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    }
                    const responsee = await fetch(url_main + 'order/capture_payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    const res = await responsee.json();
                    console.log(res);
                },
                prefill: {
                    name: "Akshansh",
                    email: "Akshansh@gmailc.om",
                    contact: "2222222222"
                },
                notes: {
                    address: "donn, con, in"
                },
                theme: {
                    color: "#61dafb"
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        } catch (error) {
            console.error('Error creating order:', error)
            setError('Failed to create order')
        }
    }

    return (
        <div className="payment-form">
            <header className="payment-heade">
                <img src={logo} className="payment-logo" alt="logo" />
                <p></p>
                <button className="payment-button" onClick={displayRazorpay}>
                    Pay
                </button>
            </header>
        </div>
    )
}