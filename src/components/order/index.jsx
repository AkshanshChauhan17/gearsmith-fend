import { useEffect, useState } from "react"
import url_main from "../../functions/url"
import logo from "../../assets/images/gearsmith-logo.webp"
import { useNavigate } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai"

export default function PaymentForm({data_d, u_email, paymentRes, setPaymentRes, setLoadingPage}) {
    const  [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

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
        setLoading(true)

        try {
            const response = await fetch(url_main + 'order/create_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userToken: localStorage.token,
                    user_address: JSON.stringify(data_d.shipping_address)
                })
            })

            const result = await response.json()

            if(!result) {
                alert("Server error. Are you online")
                return
            }

            const {amount, id: order_id, currency} = result

            var options = {
                key: "rzp_live_rs6UWRJ2Auh5hC",
                amount: amount.toString(),
                currency: currency,
                name: data_d.user_meta.first_name + " " + data_d.user_meta.last_name,
                description: `${data_d.user_meta.first_name} Checkout From GearSmith on ${new Date().toISOString().split("T")[0] + "at" + new Date().toISOString().split("T")[1]}`,
                image: url_main + "media/image/user/" + u_email + "?r=100",
                order_id: order_id,
                handler: async function (response) {
                    var data = {
                        orderCreationId: order_id,
                        userToken: localStorage.token,
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
                    setLoading(false)
                    setPaymentRes(res)
                },
                prefill: {
                    name: data_d.user_meta.first_name + " " + data_d.user_meta.last_name,
                    email: u_email,
                    contact: data_d.user_meta.mobile_no
                },
                notes: {
                    address: `${data_d.user_meta.first_name} Checkout From GearSmith on ${new Date().toISOString().split("T")[0] + "at" + new Date().toISOString().split("T")[1]}`
                },
                theme: {
                    color: "#000000"
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        } catch (error) {
            setError('Failed to create order')
            setLoading(false)
        }
    }

    useEffect(()=>{
        const res = loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        )

        if(!res) {
            alert("Razorpay SDK failed to load, Are you online?")
            return
        }
    }, [])

    useEffect(()=>{
        if(paymentRes.status) {
            setLoadingPage(true)
            setLoadingPage(false)
            navigate("/myorder")
        }
    }, [paymentRes])

    return (
        <div className="payment-form">
            <header className="payment-heade">
                <img src={logo} className="payment-logo" alt="logo" />
                <p className={paymentRes.status ? "alert" : "success"}>{paymentRes.message}</p>
                <button className="payment-button" disabled={loading} onClick={displayRazorpay}>
                    { loading ? <AiOutlineLoading className="loader" /> : "Place Order" }
                </button>
            </header>
        </div>
    )
}