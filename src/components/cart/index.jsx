import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import CartProduct from "./cart_product"
import { removeProductFromCart } from "./post.reqs"
import { AiTwotoneWarning } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export default function Cart({ud}) {
    const [userCartData, setUserCartData] = useState([])
    const [removeCount, setRemoveCount] = useState(1)
    var [totalCost, setTotalCost] = useState(0)
    const [loading, setLoading] = useState(true)

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
            .then(async (res)=>{
                var newUserCartData = []
                setUserCartData(newUserCartData)
                var newTotalCost = 0
                await res.map((d)=>{
                    console.log(d.price * d.quantity)
                    newTotalCost = newTotalCost + (d.price * d.quantity)
                    setTotalCost(newTotalCost)
                })
                newUserCartData = res
                setUserCartData(newUserCartData)
            }).catch((err)=>console.error(err))
            .finally(()=>setLoading(false))
    }, [removeCount])
    
    if(userCartData.length===0) {
        return <div className="loading-ar gap-10 font-ss">
            no data found  <AiTwotoneWarning />
        </div>
    }

    if(loading) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="cart">
            <h1>Total Products in Cart: {userCartData.length}</h1>
            <h2>Total Cost: {totalCost}</h2>
            <br />
            <br />
            <div className="cart-product-ar">
                <div className="cart-products-left">
                    {
                        userCartData.map((data, i)=>{
                            return <CartProduct key={i} pi={data.product_id} pq={data.quantity} pc={data.color} ps={data.size} hrcDef={handleRemoveFormCart} />
                        })
                    }
                </div>
                <div className="cart-products-right">
                </div>
            </div>
        </div>
    )
}