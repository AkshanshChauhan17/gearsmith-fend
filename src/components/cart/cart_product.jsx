import { useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineDelete, AiOutlineLoading } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"

export default function CartProduct({pi, pq, hrcDef}) {
    const [productData, setProductData] = useState({})
    const [onClickRemove, setOnClickRemove] = useState(false)

    useState(()=>{
        getRequest("product/" + pi)
            .then((pd)=>{
                setProductData(pd)
            })
            .catch(err=>console.log(err))
            .finally(()=>setOnClickRemove(false))
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
                    <div className="info">
                        <b>Price: </b>
                        {productData.price}
                    </div>
                </div>
            </div>
            <div className="controls">
                <button className="control" disabled={onClickRemove} onClick={()=>{hrcDef(pi); setOnClickRemove(true);}}>
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