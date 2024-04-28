export default function ShippingAndDeliveryPolicy() {
    const data = [
        {
            heading: "SHIPPING & DELIVERY POLICY",
            content: <div>
                Last updated December 15, 2022<br />
                This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: https://www.gearsmith.in/general-5.<br />
                Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.
            </div>
        },
        {
            heading: "WHAT ARE MY SHIPPING & DELIVERY OPTIONS?",
            content: <div>
                We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.<br />
                Free Shipping<br />
                We offer free Standard 3-5 days shipping shipping on all domestic orders.<br />
                Once the order is received we will send a confirmation email. Orders take a minimum of 5 days to be delivered to the customer's location. Similarly depending on the location of the buyer, orders may take a maximum of 7 days to be delivered.
            </div>
        },
        {
            heading: "DO YOU DELIVER INTERNATIONALLY?",
            content: <div>
                We offer worldwide shipping. Free Standard 3-5 days shipping shipping is not valid on international orders.<br />
                Please note, we may be subject to various rules and restrictions in relation to some international deliveries and you may be subject to additional taxes and duties over which we have no control. If such cases apply, you are responsible for complying with the laws applicable to the country where you live and will be responsible for any such additional costs or taxes.
            </div>
        },
        {
            heading: "WHAT HAPPENS IF MY ORDER IS DELAYED?",
            content: <div>
                If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery. 
            </div>
        },
        {
            heading: "QUESTIONS ABOUT RETURNS?",
            content: <div>
                If you have questions about returns, please review our Return Policy: https://www.gearsmith.in/about-5.
            </div>
        },
        {
            heading: "HOW CAN YOU CONTACT US ABOUT THIS POLICY?",
            content: <div>
                if you have any questions concerning our return policy, please contact us at:<br />
                gmithpvtltd@gmail.com
            </div>
        }
    ]
    return <div className="rrcp">
        <h1>Shipping & Delivery Policy</h1>
        {
            data.map((d, i)=>{
                return <div className="container">
                    <h4>{d.heading}</h4>
                    {d.content}
                </div>
            })
        }
    </div>
}