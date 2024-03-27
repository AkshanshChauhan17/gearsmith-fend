import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import CartProduct from "./cart_product"

export default function Cart({ud}) {
    const [userCartData, setUserCartData] = useState([])
    console.log(ud)
    const handleRemoveFormCart = ()=> {
        
    }
    useEffect(()=>{
        getRequest("product/get_from_cart/" + ud.email)
            .then((res)=>{
                console.log(res)
                setUserCartData(res)
            }).catch((err)=>console.error(err))
    }, [handleRemoveFormCart])
    
    if(userCartData.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="cart">
            {
                userCartData.map((data, i)=>{
                    return <CartProduct key={i} pi={data.product_id} pq={data.quantity} hrcDef={handleRemoveFormCart} />
                })
            }
        </div>
    )
}