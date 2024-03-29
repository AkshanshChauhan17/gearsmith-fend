import { useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"

export default function CartProduct({pi, pq, hrcDef, ps, pc}) {
    const [productData, setProductData] = useState({})
    const [onClickRemove, setOnClickRemove] = useState(false)

    useState(()=>{
        setOnClickRemove(true)
        getRequest("product/" + pi)
            .then((pd)=>{
                const newProductData = pd;
                setProductData(newProductData)
                setOnClickRemove(false)
            })
            .catch(err=>console.log(err))
    }, [hrcDef])

    if(productData.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="cart-product">
            <img src={productData.media && JSON.parse(productData.media)[0].small} className="cart-product-image" />
            <div className="info-ar">
                <div className="upper">
                    <b>Id: </b>
                    {productData.product_id}
                </div>
                <div className="bottom">
                    <div className="info">
                        <b>Name: </b>
                        {productData.name}
                    </div>
                    <div className="info">
                        <b>Quantity: </b>
                        {pq}
                    </div>
                </div>
                <div className="bottom">
                    <span>Product <b>{ps}</b> in Size and <b>{pc}</b> in Color</span>
                    <div>₹{productData.price}</div>
                    <h2>Total: ₹{productData.price * pq}</h2>
                </div>
            </div>
            <div className="controls">
                <button className="control" disabled={onClickRemove} onClick={()=>{hrcDef(pi);}}>
                    {
                        onClickRemove ? <AiOutlineLoading className="loader" /> : <span>
                            <AiOutlineDelete />REMOVE
                        </span>
                    }
                </button>
                <button className="control">
                    <MdProductionQuantityLimits />BUY
                </button>
            </div>
        </div>
    )
}