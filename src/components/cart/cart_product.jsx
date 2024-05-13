import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai"
import { CgClose } from "react-icons/cg"
import { Link } from "react-router-dom"
import { isEmptyObject } from "jquery"
import url_main from "../../functions/url"

export default function CartProduct({pi, pq, hrcDef, ps, pc, rc}) {
    const [productData, setProductData] = useState({})
    const [onClickRemove, setOnClickRemove] = useState(false)
    const [quantity, setQuantity] = useState(pq)

    useEffect(()=>{
        setOnClickRemove(true)
        getRequest("product/cart/" + pi)
            .then((pd)=>{
                const newProductData = pd;
                setProductData(newProductData[0])
                setOnClickRemove(false)
            })
            .catch(err=>console.log(err))
        return ()=>{
            setProductData({})
            setOnClickRemove(false)
        }
    }, [rc, hrcDef, pi, pq])

    console.log(productData)

    if(isEmptyObject(productData)) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <tr>
            <td>
                <img src={url_main + productData.media + "?r=50"} class="cart-product-image" />
            </td>
            <td>
                <Link to={"/product/" + productData.product_id} class="upper link">
                    {productData.name}
                </Link>
            </td>
            <td>
                {quantity}
            </td>
            <td>
                ₹{productData.price}
            </td>
            <td>
                {ps}
            </td>
            <td>
                {pc}
            </td>
            <td>
                <button class="control" disabled={onClickRemove} onClick={(e)=>hrcDef(pi)}>
                    {
                        onClickRemove ? <AiOutlineLoading class="loader" /> : <AiOutlineClose />
                    }
                </button>
            </td>
        </tr>
    )
}