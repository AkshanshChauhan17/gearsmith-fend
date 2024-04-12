import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineDelete, AiOutlineDeliveredProcedure, AiOutlineLoading } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiCross } from "react-icons/bi"
import { FaCross } from "react-icons/fa6"
import { CgClose } from "react-icons/cg"
import { Link } from "react-router-dom"
import { isEmptyObject } from "jquery"

export default function CartProduct({pi, pq, hrcDef, ps, pc, rc}) {
    const [productData, setProductData] = useState({})
    const [onClickRemove, setOnClickRemove] = useState(false)
    const [quantity, setQuantity] = useState(pq)

    useEffect(()=>{
        setOnClickRemove(true)
        console.log(pi)
        getRequest("product/cart/" + pi)
            .then((pd)=>{
                const newProductData = pd;
                setProductData(newProductData[0])
                setOnClickRemove(false)
            })
            .catch(err=>console.log(err))
    }, [rc, hrcDef, pi])

    if(isEmptyObject(productData)) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="cart-product">
            <img src={productData.media} className="cart-product-image" />
            <div className="info-ar">
                <Link to={"/product/" + productData.product_id} className="upper">
                    <div className="bottom">
                        <h3>{productData.name}</h3>
                        <h2>₹{productData.price * quantity}</h2>
                    </div>
                </Link>
                <div className="bottom">
                    <b>Quantity</b> <input disabled type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} min={1} max={100}/>
                </div>
            </div>
            <div className="controls">
                <button className="control" disabled={onClickRemove} onClick={()=>{hrcDef(pi);}}>
                    {
                        onClickRemove ? <AiOutlineLoading className="loader" /> : <span>
                            <CgClose size={30} />
                        </span>
                    }
                </button>
            </div>
        </div>
    )
}