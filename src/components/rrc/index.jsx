export default function ReturnRefundCancellationPolicy() {
    const data = [
        {
            heading: "RETURN POLICY",
            content: <div>Last updated December 15, 2022<br />
            Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund or an exchange. Please see below for more information on our return policy.<br />
            P.S. This is only eligible on select products. Certain products are not refundable/eligible for exchange</div>
        },
        {
            heading: "RETURNS",
            content: <div>
                All returns must be postmarked within seven (7) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.
            </div>
        },
        {
            heading: "RETURN PROCESS",
            content: <div>
                To return an item, please email customer service at gmithpvtltd@gmail.com to obtain a Return Merchandise Authorisation (RMA) number. After receiving a RMA number, place the item securely in its original packaging, and mail your return to the following address:<br />
                GEARSMITH PRIVATE LIMITED<br />
                Attn: Returns<br />
                RMA #<br />
                F-79, Gujaini, Kanpur Nagar Kanpur, Uttar Pradesh 208022<br />
                India<br />
                Return shipping charges will be paid or reimbursed by us.<br />
            </div>
        },
        {
            heading: "REFUNDS",
            content: <div>
                After receiving your return and inspecting the condition of your item, we will process your return or exchange.<br />
                Please allow at least five (5) days from the receipt of your item to process your return or exchange. We will notify you by email when your return has been processed.
            </div>
        },
        {
            heading: "EXCEPTIONS",
            content: <div>
                For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.
            </div>
        },
        {
            heading: "QUESTIONS",
            content: <div>
                if you have any questions concerning our return policy, please contact us at:<br />
                gmithpvtltd@gmail.com
            </div>
        }
    ]
    return <div className="rrcp">
        <h1>Return, Refund & Cancellation Policy</h1>
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