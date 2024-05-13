import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import url_main from "../../functions/url"
import { isEmptyObject } from "jquery"

export default function OrderCard({data}) {
    const [productData, setProductData] = useState({})
    useEffect(()=>{
        getRequest("product/user/" + data.product_id)
            .then((e)=>{
                setProductData(e[0])
        })
        return ()=>{
            setProductData({})
        }
    }, [])

    return <div className="order">
        <div className="left-dp" style={{backgroundImage: productData.media ? `url(${url_main + productData.media[0] + "?r=100"})` : null}}></div>
        <div className="right-top">
            <div className="name">{productData.name}</div>
            <div className="id">{productData.product_id}</div>
        </div>
        <div className="price">₹{productData.price} x {data.quantity}</div>
    </div>
}