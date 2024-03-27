import { useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineDelete } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"

export default function CartProduct({pi, pq, hrcDef}) {
    const [productData, setProductData] = useState({})
    useState(()=>{
        getRequest("product/" + pi)
            .then((pd)=>setProductData(pd))
            .catch(err=>console.log(err))
    }, [])

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
                <div className="control">
                    <AiOutlineDelete />REMOVE
                </div>
                <div className="control">
                    <MdProductionQuantityLimits />BUY
                </div>
            </div>
        </div>
    )
}