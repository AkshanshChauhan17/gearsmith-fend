import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import CartProduct from "./cart_product"
import { removeProductFromCart } from "./post.reqs"
import { AiOutlineLoading, AiTwotoneWarning } from "react-icons/ai"
import CheckoutForm from "./checkout"

export default function Cart({ud, gcDef}) {
    const [userCartData, setUserCartData] = useState([])
    const [removeCount, setRemoveCount] = useState(1)
    var [totalCost, setTotalCost] = useState(0)
    const [loadingPage, setLoadingPage] = useState(false)
    const [loading, setLoading] = useState(true)
    const [paymentRes, setPaymentRes] = useState({})

    const handleRemoveFormCart = (product_id)=> {
        removeProductFromCart(ud.email, product_id)
            .then(()=>{
                setRemoveCount(removeCount + 1)
            })
            .catch((e)=>console.error(e))
            .finally(()=>gcDef())
    }

    useEffect(()=>{
        getRequest("product/get_from_cart/" + ud.email)
            .then(async (res)=>{
                var newTotalCost = 0
                await res.map((d)=>{
                    newTotalCost = newTotalCost + d.total_price
                })
                setTotalCost(newTotalCost)
                setUserCartData(res)
            }).catch((err)=>console.error(err))
            .finally(()=>{
                setLoading(false)
                gcDef()
            })
    }, [removeCount, paymentRes])
    
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

    if(loadingPage) {
        return <div className="flex center full">
            <AiOutlineLoading className="loader" size={40} />...redirect to my order page
        </div>
    }

    return (
        <div className="cart">
            <h1>Total Products in Cart: {userCartData.length}</h1>
            <h2>Total Cost: {totalCost}</h2>
            <br />
            <div className="mid-cart">
                <table className="cart-product-table">
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                    {
                        userCartData.map((data, i)=>{
                            return <CartProduct key={i} pi={data.product_id} pq={data.quantity} pc={data.color} ps={data.size} hrcDef={handleRemoveFormCart} rc={removeCount} />
                        })
                    }
                </table>
                <div className="cart-checkout-ar">
                    <CheckoutForm slpDef={setLoadingPage} ps={paymentRes} psDef={setPaymentRes} ud_d={ud} />
                </div>
            </div>
        </div>
    )
}