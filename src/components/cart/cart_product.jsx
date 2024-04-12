import { useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineDelete, AiOutlineDeliveredProcedure, AiOutlineLoading } from "react-icons/ai"
import { MdProductionQuantityLimits } from "react-icons/md"
import { BiCross } from "react-icons/bi"
import { FaCross } from "react-icons/fa6"
import { CgClose } from "react-icons/cg"
import { Link } from "react-router-dom"

export default function CartProduct({pi, pq, hrcDef, ps, pc}) {
    const [productData, setProductData] = useState({})
    const [onClickRemove, setOnClickRemove] = useState(false)
    const [quantity, setQuantity] = useState(pq)

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
            <img src={productData.media && JSON.parse(productData.media)[0].medium} className="cart-product-image" />
            <div className="info-ar">
                <Link to={"/product/" + productData.product_id} className="upper">
                    <AiOutlineDeliveredProcedure size={20} /> {productData.product_id}
                </Link>
                <div className="bottom">
                    <b>Quantity</b> <input disabled type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} min={1} max={100}/>
                </div>
                <div className="bottom">
                    <h3>{productData.name}</h3>
                    <h2>₹{productData.price * quantity}</h2>
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