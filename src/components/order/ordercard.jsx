import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"

export default function OrderCard({data}) {
    console.log(data)
    const [productData, setProductData] = useState({})
    useEffect(()=>{
        getRequest("product/user/" + data.product_id)
            .then(e=>setProductData(e[0]))
    }, [])
    return <div className="order">
        <div className="left-dp" style={{backgroundImage: `url('${productData.media}')`}}></div>
        <div className="right-top">
            <div className="name">{productData.name}</div>
            <div className="id">{productData.product_id}</div>
        </div>
        <div className="price">₹{productData.price} x {data.quantity}</div>
    </div>
}