import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import CartProduct from "./cart_product"
import { removeProductFromCart } from "./post.reqs"
import { AiTwotoneWarning } from "react-icons/ai"

export default function Cart({ud}) {
    const [userCartData, setUserCartData] = useState([])
    const [removeCount, setRemoveCount] = useState(1)

    const handleRemoveFormCart = (product_id)=> {
        removeProductFromCart(ud.email, product_id)
            .then(()=>{
                const i = removeCount + 1
                setRemoveCount(i)
            })
            .catch((e)=>console.error(e))
    }

    useEffect(()=>{
        getRequest("product/get_from_cart/" + ud.email)
            .then((res)=>{
                setUserCartData(res)
            }).catch((err)=>console.error(err))
    }, [removeCount])
    
    if(userCartData.length===0) {
        return <div className="loading-ar gap-10 font-ss">
            no data found  <AiTwotoneWarning />
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