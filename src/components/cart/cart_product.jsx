import { useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineDelete, AiOutlineDeliveredProcedure, AiOutlineLoading } from "react-icons/ai"
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
                    <AiOutlineDeliveredProcedure size={20} /> {productData.product_id}
                </div>
                <div className="bottom">
                    <h2>{productData.name}</h2>
                    <h3>₹{productData.price * pq}</h3>
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