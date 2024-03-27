import { isEmptyObject, isNumeric } from "jquery"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getRequest } from "../../functions/get.req"
import { addProductToCart } from "../cart/post.reqs"

function Products({product_data, ud}) {
    const [productColorIndex, setProductColorIndex] = useState(0)
    const [productColor, setProductColor] = useState([])
    const [productImages, setProductImages] = useState([])
    const [productData, setProductData] = useState()
    const [productSize, setProductSize] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [quantityVerification, setQuantityVerification] = useState(false)
    const [addToCartStatus, setAddToCartStatus] = useState({status: false, message: "ADD TO CART"})

    const handleAddToCart = ()=>{
        addProductToCart(ud.email, product_data.productView.data.product_id, quantity)
            .then((d)=>{
                if(d.affectedRows===1) {
                    return setAddToCartStatus({
                        status: true,
                        message: "Product is Added To Cart."
                    })
                }
                setAddToCartStatus({
                    status: false,
                    message: "Product is Already in Cart!"
                })
            })
            .catch((e)=>console.error(e))
    }

    useEffect(()=>{
        if(quantity<=0 || !isNumeric(quantity)) {
            return setQuantityVerification(false)
        }
        return setQuantityVerification(true)
    }, [quantity])

    useEffect(() => {
        Promise.all([
            getRequest("product/" + product_data.productView.data.product_id),
        ])
        .then(([productResponse]) => {
            setProductData(productResponse)
            setProductColor(JSON.parse(productResponse.color_list))
            setProductSize(JSON.parse(productResponse.size_list))
            setProductImages(JSON.parse(productResponse.media))
        })
        .catch(err => console.error(err))
    }, [])

    if(isEmptyObject(productData)) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return(
        <div className="product-view">
            <div className="product-view-left">
                <div className="product-view-image-slider">
                <img className="product-view-image" src={productImages[imageIndex].large} alt="" />
                </div>
                <br />
                <div className="product-view-image-slider-controls">
                    {
                        productImages.map((image, i)=>{
                            return <img className={imageIndex===i ? "product-view-control-image-active" : "product-view-control-image"} onClick={()=>setImageIndex(i)} loading="lazy" key={i} src={image.small} /> 
                        })
                    }
                </div>
            </div>
            <div className="product-view-right">
                <div className="product-heading">{productData.name}</div>
                <br />
                <div className="product-content">
                    {
                        productData.product_summary
                    }
                </div>
                <br />
                <div className="product-price">₹ {productData.price}</div>
                <div className="product-text">Sales Tex Included</div>
                <br />
                <div className="product-color-section">
                    {productColor.length>0 && <div className="product-color-text">Color: {productColor[productColorIndex].color_name}</div>}
                    <div className="product-color-selection-ar">
                        {
                            productColor.map((col, i)=>{
                                return <div className="product-color" key={i} onClick={()=>setProductColorIndex(i)} style={{backgroundColor:  col.color_code}}></div>
                            })
                        }
                    </div>
                </div>
                <br />
                <div className="drop-ar">
                    <div className="drop-section">
                        Size
                        <select name="" id="" required>
                            <option value=""></option>
                            {
                                productSize.map((ps, i)=>{
                                    if(isEmptyObject(ps)) {
                                        return null
                                    }
                                    return <option value={ps.size_name} key={i}>{ps.size_name + " " + ps.size}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="drop-section">
                        Quantity
                        <input type="number" min={1} max={100} required value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                    </div>
                </div>
                <br />
                {
                    quantityVerification ? 
                    <div className="submit-ar">
                        <button className="button-atoc" disabled={addToCartStatus.status} onClick={()=>handleAddToCart()}>
                            {
                                addToCartStatus.message
                            }
                        </button>
                    </div> : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    product_data: state.product.product_data,
})

export default connect(mapStateToProps)(Products)