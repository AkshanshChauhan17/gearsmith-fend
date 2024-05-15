import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { CgClose } from "react-icons/cg"
import { Link } from "react-router-dom"
import OrderCard from "./ordercard"
import { MdPending } from "react-icons/md"
import { GoAlert } from "react-icons/go"

export default function MyOrder() {
    const [orders, setOrders] = useState([])
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        getRequest("order/user/" + localStorage.token)
            .then((ords)=>{
                setOrders(ords);
                console.log(ords)
            })
            .catch((err)=>console.error(err))
    }, [])

    const openInformation = (i)=>{
        setIndex(i)
        setOpen(true)
    }

    if(orders.length===0) {
        return <div className="loading-ar">
            No order list
        </div>
    }
    return(
        <div className="my-order">
            <h2>Order Summary</h2>
            <div className="order-list">
                {
                    orders.map((p, ii)=>{
                        return <div className="orders" key={ii}>
                            <div className="order-info">
                                <div className="small-section">
                                    <div className="section">
                                        {p.order_id}
                                    </div>
                                    <div className="section">
                                        {p.is_conform ? <span className="confirm">Ordered</span> : <span className="pending">Pending <GoAlert /></span>}
                                    </div>
                                </div>
                                <div className="big-section">
                                    <div className="section">
                                        {new Date(p.timestamp).toDateString()}
                                    </div>
                                    <div className="section">
                                        <b>Total:</b> ₹{p.total_cost}
                                    </div>
                                </div>
                            </div>
                            <div className="order-ar">
                                {
                                    JSON.parse(JSON.parse(`"${p.product_list}"`)).length===1 ? <h4>Product</h4> :
                                    <h4>Product Group</h4>
                                }
                                {
                                    JSON.parse(JSON.parse(`"${p.product_list}"`)).map((e, i)=>{
                                        return <OrderCard data={e} key={i} />
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}