import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { CgClose } from "react-icons/cg"
import { Link } from "react-router-dom"

export default function MyOrder() {
    const [orders, setOrders] = useState([])
    const [index, setIndex] = useState(0)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        getRequest("order/user/" + localStorage.token)
            .then((ords)=>setOrders(ords))
            .catch((err)=>console.error(err))
    }, [])

    const openInformation = (i)=>{
        setIndex(i)
        setOpen(true)
    }

    if(orders.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }
    return(
        <div className="my-order">
            <h2>{open ? `View: ${orders[index].order_id}` : "Order Summary"}</h2>
            {
            !open ?
            <table>
                <thead>
                <tr>
                    {
                        Object.keys(orders[0]).map((e, i)=>{
                            if(e==="id"  || e==="user_id" || e==="product_list" || e==="user_address" || e==="user_meta" || e==="is_conform" || e==="is_cancel") {
                                return null
                            }
                            return <th key={i}>{e}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index} onClick={()=>openInformation(index)}>
                        {
                            Object.keys(order).map((e, i)=>{
                                if(e==="id" || e==="user_id"  || e==="product_list" || e==="user_address" || e==="user_meta" || e==="is_conform" || e==="is_cancel") {
                                    return null
                                }
                                return <td key={i}>{order[e]}</td>
                            })
                        }
                    </tr>
                ))}
                </tbody>
            </table>
            :
            <table>
                <CgClose onClick={()=>setOpen(false)} />
                <thead>
                    <tr>
                        <th>Product List</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {
                            JSON.parse(orders[index].product_list).map((e, i)=>{
                                return <td><Link to={"/product/" + e.product_id}>{e.product_id}</Link></td>
                            })
                        }
                    </tr>
                </tbody>
            </table>
            }
        </div>
    )
}