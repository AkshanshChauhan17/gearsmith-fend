import { isEmptyObject, isNumeric } from "jquery"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getRequest } from "../../functions/get.req"
import { addProductToCart } from "../cart/post.reqs"
import { AiFillLock, AiOutlineClose, AiOutlineLoading, AiOutlineRollback, AiOutlineSend, AiOutlineSwapRight } from "react-icons/ai"
import { Link } from "react-router-dom"
import Rating from "./rating"
import user from "../../assets/images/unnamed.webp"
import { postRating, removeRating } from "./rating.post"

function Products({ud, gcDef, change}) {
    const [productColorIndex, setProductColorIndex] = useState(0)
    const [productColor, setProductColor] = useState([])
    const [productImages, setProductImages] = useState([])
    const [productData, setProductData] = useState()
    const [productSize, setProductSize] = useState([])
    const [productSizeSelected, setProductSizeSelected] = useState("default")
    const [imageIndex, setImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [quantityVerification, setQuantityVerification] = useState(false)
    const [addToCartStatus, setAddToCartStatus] = useState({status: false, message: "ADD TO CART"})
    const [onClickAddToCart, setOnClickAddToCart] = useState(false)
    const [productPrice, setProductPrice] = useState(0)
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [ratingData, setRatingData] = useState([])
    const [totalRating, setTotalRating] = useState(0)
    const [ratingLoad, setRatingLoad] = useState(false)
    const [productSizeTable, setProductSizeTable] = useState({})
    const [fiveStarRatingPercentage, setFiveStartRatingPercentage] = useState({})

    const handleClick = (selectedRating) => {
        setRating(selectedRating)
    }

    const fetchData = async (url, setDataFunction) => {
        try {
            if (isEmptyObject(productData)) {
                throw "false"
            }
            const data = await getRequest(url)
            setDataFunction(data)
            return data
        } catch (error) {
            throw error
        }
    }
    
    const getRating = async () => {
        try {
            return await fetchData("product/rate/" + productData.product_id, setRatingData)
        } catch (error) {
            null
        }
    }
    
    const getRatingPercentage = async () => {
        try {
            return await fetchData("product/rate/percentage/" + productData.product_id, setFiveStartRatingPercentage)
        } catch (error) {
            null
        }
    }

    const handleRating = async()=>{
        setRatingLoad(true)
        await postRating(ud.email, JSON.parse(ud.meta).profile_photo.small, productData.product_id, rating, comment)
            .then((e)=>{
                if(e.status) {
                    setRating(0)
                    setComment("")
                } else {
                    setRating(0)
                    alert(e.message)
                }
            }).catch((err)=>{
                console.error(err)
            })
            await getRating()
            getRatingPercentage()
            setRatingLoad(false)
    }

    const handleRemoveRating = async(p_id)=>{
        await removeRating(ud.email, p_id)
            .then((e)=>{
                null
            }).catch((err)=>{
                console.error(err)
            })
            await getRating()
            getRatingPercentage()
    }

    const handleAddToCart = ()=>{
        setOnClickAddToCart(true)
        addProductToCart(ud.email, window.location.href.split("/").splice(-1), quantity, productSizeSelected, productColor.length===0 ? "default" : productColor[productColorIndex].color_name, productPrice)
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
            .finally(()=>{
                setOnClickAddToCart(false)
                gcDef()
            })
    }

    useEffect(()=>{
        if(quantity<=0 || !isNumeric(quantity)) {
            return setQuantityVerification(false)
        }
        return setQuantityVerification(true)
    }, [quantity])

    useEffect(()=>{
        getRating()
        getRatingPercentage()
    }, [productData])

    useEffect(()=>{
        try {
            const total = fiveStarRatingPercentage.newRatingPercentage.five_star + fiveStarRatingPercentage.newRatingPercentage.four_star + fiveStarRatingPercentage.newRatingPercentage.three_star + fiveStarRatingPercentage.newRatingPercentage.two_star + fiveStarRatingPercentage.newRatingPercentage.one_star
            setTotalRating(total)
        } catch (err) {
            err
        }
    }, [fetchData])

    useEffect(() => {
        Promise.all([
            getRequest("product/" + window.location.href.split("/").splice(-1)),
        ])
        .then(([productResponse]) => {
            setProductData(productResponse)
            setProductColor(JSON.parse(productResponse.color_list))
            setProductSize(JSON.parse(productResponse.size_list))
            setProductImages(JSON.parse(productResponse.media))
            setProductPrice(productResponse.price)
            setProductSizeTable(JSON.parse(productResponse.size_table))
        })
        .catch(err => console.error(err))
        window.scrollTo(0, 0)
    }, [change])

    if(isEmptyObject(productData) || isEmptyObject(fiveStarRatingPercentage)) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return(
        <div className="product-view-ar">
            <Link to={"/shop"} className="url-top">
                <AiOutlineRollback /> {"Shop/Product/" + productData.name}
            </Link>
            <br />
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
                    <div className="product-header">
                        <div className="left">
                            {/* <div className="gearsmith-logo"></div> */}
                            <div className="gearsmith-name">Gearsmith</div>
                        </div>
                        <div className="right">
                            {productData.product_id}
                        </div>
                    </div>
                    <div className="product-heading">{productData.name}</div>
                    <div className="total-rating-rv">
                            {
                                <div className="stars-rv">
                                    {
                                        [...Array(5)].map((_, i)=>{
                                            const ratingValue = i + 1
                                            return (
                                                <span
                                                key={i} 
                                                className={i < Math.round(fiveStarRatingPercentage.averageRating) ? "filled" : "empty"}
                                                >
                                                    &#9733;
                                                </span>
                                            )
                                        })
                                    } <div className="stars-rv-text">{ratingData.length} reviews</div>
                                </div>
                            }
                            <div className="in-stock">
                                {
                                    productData.is_available ? <div className="message" title={"Product with id: " + productData.product_id + " is Available in Stock"}>Available</div> : <div className="message-out" title={"Product with id: " + productData.product_id + " is Out of Stock"}>Out of Stock</div>
                                }
                            </div>
                        </div>
                        <div className="product-price">{productData.previous_price === productData.price || productData.previous_price===0 ? "₹" + productData.price : <><s className="prv-price">₹{productData.previous_price}</s> ₹{productData.price} <div className="discount">{productData.discount} Discount</div></>}</div>
                        {/* <div className="product-text">Sales Tex Included</div>
                        <br />
                        <div className="product-content">
                            {
                                productData.product_summary
                            }
                        </div>
                        <br /> */}
                    <div className="product-color-section">
                        {productColor.length>0 && <div className="product-color-text"><b>Color:</b> {productColor[productColorIndex].color_name}</div>}
                        <div className="product-color-selection-ar">
                            {
                                productColor.map((col, i)=>{
                                    return <div className="product-color" key={i} onClick={()=>setProductColorIndex(i)} style={{backgroundColor:  col.color_code}}></div>
                                })
                            }
                        </div>
                    </div>
                    <div className="drop-ar">
                        <div className="drop-section">
                            <div className="drop-section-heading"><b>Size:</b> {productSizeSelected}</div>
                            <div className="drop-size-ar" value={productSizeSelected}>
                                {
                                    productSize.map((ps, i)=>{
                                        if(isEmptyObject(ps)) {
                                            return null
                                        }
                                        return <button className={productSizeSelected===ps.size_name + " " + ps.size ? "drop-size-btn-selected" : "drop-size-btn"} value={ps.size ? ps.size_name + " " + ps.size : ps.size_name } key={i} onClick={(e)=>setProductSizeSelected(e.target.value)}>{ps.size_name}</button>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {
                        quantityVerification || productSizeSelected!=null ? 
                        <div className="submit-ar">
                            <input className="submit-quantity" type="number" min={1} max={100} required value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            <button className="button-atoc" disabled={addToCartStatus.status} onClick={()=>handleAddToCart()}>
                                {
                                    onClickAddToCart ? <AiOutlineLoading className="loader" size={17} /> : addToCartStatus.message
                                }
                            </button>
                        </div> : <div className="submit-ar" style={{opacity: 0.5}}>
                        <input type="number" min={1} max={100} required value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            <button className="button-atoc" disabled={true}>
                                {
                                    addToCartStatus.message
                                } <AiFillLock />
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className="review-arr">
            <div className="product-summary">
                <div className="heading">Description</div>
                {productData.product_summary}
            </div>
            <div className="review-section-inputs">
                <div className="review-top">
                <div className="stars" style={rating===0 ? {zoom: "2"}: {}}>
                    {
                        [...Array(5)].map((_, i)=>{
                            const ratingValue = i + 1
                            return (
                                <span
                                key={i} 
                                className={ratingValue <= rating ? "filled" : "empty"}
                                onClick={()=>handleClick(ratingValue)}>
                                    &#9733;
                                </span>
                            )
                        })
                    } ({rating}/5)
                </div>
                <div className="profile" style={rating===0 ? {display: "none"} : {}}>
                    {ud.email}
                    <img src={JSON.parse(ud.meta).profile_photo.small} alt="" />
                </div>
                </div>
                <div hidden={rating===0}>
                    <textarea cols="30" rows="10" className="comment" value={comment} placeholder="comment here" onChange={(e)=>setComment(e.target.value)}></textarea>
                    <div className="controls">
                        <button className="comment-submit" onClick={()=>setRating(0)}>Cancel<AiOutlineClose /></button>
                        {ratingLoad ? <button className="comment-submit"><AiOutlineLoading className="loader" /></button> : <button className="comment-submit" onClick={()=>handleRating()}>Post<AiOutlineSend /></button>}
                    </div>
                </div>
            </div>
            </div>
            <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
            {   productSizeTable.chest ?
                <div className="size-guide" style={{flex: 1, minWidth: 300, padding: 20, backgroundColor: "white", display: productData.size_table==='{"chest":{"S":"","M":"","L":"","XL":""},"length":{"S":"","M":"","L":"","XL":""},"sleeve":{"S":"","M":"","L":"","XL":""},"shoulder":{"S":"","M":"","L":"","XL":""}}' ? "none" : ""}}>
                    <h3>Size Guide</h3>
                    <table style={{backgroundColor: "white", outline: 0}}>
                        <tr>
                            <th>SIZE (INCH)</th>
                            <th>S</th>
                            <th>M</th>
                            <th>L</th>
                            <th>XL</th>
                        </tr>
                        <tr>
                            <td>CHEST</td>
                            <td>{productSizeTable.chest.S}</td>
                            <td>{productSizeTable.chest.M}</td>
                            <td>{productSizeTable.chest.L}</td>
                            <td>{productSizeTable.chest.XL}</td>
                        </tr>
                        <tr>
                            <td>LENGTH</td>
                            <td>{productSizeTable.length.S}</td>
                            <td>{productSizeTable.length.M}</td>
                            <td>{productSizeTable.length.L}</td>
                            <td>{productSizeTable.length.XL}</td>
                        </tr>
                        <tr>
                            <td>SLEEVE</td>
                            <td>{productSizeTable.sleeve.S}</td>
                            <td>{productSizeTable.sleeve.M}</td>
                            <td>{productSizeTable.sleeve.L}</td>
                            <td>{productSizeTable.sleeve.XL}</td>
                        </tr>
                        <tr>
                            <td>SHOULDER</td>
                            <td>{productSizeTable.shoulder.S}</td>
                            <td>{productSizeTable.shoulder.M}</td>
                            <td>{productSizeTable.shoulder.L}</td>
                            <td>{productSizeTable.shoulder.XL}</td>
                        </tr>
                    </table>
                </div> : <div className="size-guide" style={{flex: 1, minWidth: 300, padding: 20, backgroundColor: "white", display: productData.size_table==='{"chest":{"S":"","M":"","L":"","XL":""},"length":{"S":"","M":"","L":"","XL":""},"sleeve":{"S":"","M":"","L":"","XL":""},"shoulder":{"S":"","M":"","L":"","XL":""}}' ? "none" : ""}}>
                    <h3>Size Guide</h3>
                    <table style={{backgroundColor: "white", outline: 0}}>
                        <tr>
                            <th>SIZE (INCH)</th>
                            <th>S</th>
                            <th>M</th>
                            <th>L</th>
                            <th>XL</th>
                        </tr>
                        <tr>
                            <td>WAIST</td>
                            <td>{productSizeTable.waist.S}</td>
                            <td>{productSizeTable.waist.M}</td>
                            <td>{productSizeTable.waist.L}</td>
                            <td>{productSizeTable.waist.XL}</td>
                        </tr>
                        <tr>
                            <td>LENGTH</td>
                            <td>{productSizeTable.length.S}</td>
                            <td>{productSizeTable.length.M}</td>
                            <td>{productSizeTable.length.L}</td>
                            <td>{productSizeTable.length.XL}</td>
                        </tr>
                        <tr>
                            <td>THIGH</td>
                            <td>{productSizeTable.thigh.S}</td>
                            <td>{productSizeTable.thigh.M}</td>
                            <td>{productSizeTable.thigh.L}</td>
                            <td>{productSizeTable.thigh.XL}</td>
                        </tr>
                    </table>
                </div>
            }
                    <div className="d grid" style={{flex: 1, minWidth: 300, alignItems: "start", alignContent: "start", fontSize: 18, display: productData.detail!=="" ? "grid" : "none", padding: 20, backgroundColor: "white", border: 0}}>
                        <h3 style={{margin: 0}}>Package Detail</h3>
                        <br />
                        <pre disabled style={{border: 0, padding: 0, color: "gray", backgroundColor: "white", textWrap: "wrap", lineBreak: "auto", whiteSpace: "pre-wrap", lineHeight: 1.4}}>{productData.detail}</pre>
                    </div>
                    <div className="d grid" style={{flex: 1, minWidth: 300, alignItems: "start", alignContent: "start", fontSize: 18, display: productData.disclaimer!=="" ? "" : "none", padding: 20, backgroundColor: "white"}}>
                        <h3 style={{margin: 0}}>Disclaimer</h3>
                        <br />
                        <pre disabled style={{border: 0, padding: 0, color: "gray", backgroundColor: "white", textWrap: "wrap", lineBreak: "auto", whiteSpace: "pre-wrap", lineHeight: 1.4}}>{productData.disclaimer}</pre>
                    </div>
            </div>
            <div className="review-heading">
                <div className="heading-text">View Reviews</div> ({ratingData.length}) <AiOutlineSwapRight className="icon" />
            </div>
            {
                ratingData.length===0 ?
                <div className="oth-review">
                    Post your first rating!!!
                </div>:
                <div className="oth-review">
                    <div className="upr-rating">
                        <div className="total-rating-rv">
                            {
                                <div className="stars-rv">
                                    {
                                        [...Array(5)].map((_, i)=>{
                                            return (
                                                <span
                                                key={i} 
                                                className={i < Math.round(fiveStarRatingPercentage.averageRating) ? "filled" : "empty"}
                                                >
                                                    &#9733;
                                                </span>
                                            )
                                        })
                                    } <div className="stars-rv-text">{fiveStarRatingPercentage.averageRating}</div>
                                </div>
                            }
                        </div>
                        <div className="review-graph">
                            <div className="meter-ar">
                                <div className="meter-star">5</div>
                                <meter className="meter" min={0} max={100} value={(fiveStarRatingPercentage.newRatingPercentage.five_star / totalRating)*100} />
                                <div className="meter-text">{fiveStarRatingPercentage.newRatingPercentage.five_star}</div>
                            </div>
                            <div className="meter-ar">
                                <div className="meter-star">4</div>
                                <meter className="meter" min={0} max={100} value={(fiveStarRatingPercentage.newRatingPercentage.four_star / totalRating)*100} />
                                <div className="meter-text">{fiveStarRatingPercentage.newRatingPercentage.four_star}</div>
                            </div>
                            <div className="meter-ar">
                                <div className="meter-star">3</div>
                                <meter className="meter" min={0} max={100} value={(fiveStarRatingPercentage.newRatingPercentage.three_star / totalRating)*100} />
                                <div className="meter-text">{fiveStarRatingPercentage.newRatingPercentage.three_star}</div>
                            </div>
                            <div className="meter-ar">
                                <div className="meter-star">2</div>
                                <meter className="meter" min={0} max={100} value={(fiveStarRatingPercentage.newRatingPercentage.two_star / totalRating)*100} />
                                <div className="meter-text">{fiveStarRatingPercentage.newRatingPercentage.two_star}</div>
                            </div>
                            <div className="meter-ar">
                                <div className="meter-star">1</div>
                                <meter className="meter" min={0} max={100} value={(fiveStarRatingPercentage.newRatingPercentage.one_star / totalRating)*100} />
                                <div className="meter-text">{fiveStarRatingPercentage.newRatingPercentage.one_star}</div>
                            </div>
                        </div>
                    </div>
                    <div className="all-rating">
                        {
                            ratingData.map((data, i)=>{
                                return <Rating data={data} i={i} user_data={ud} rRDef={handleRemoveRating}/>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state)=> ({
    product_data: state.product.product_data,
})

export default connect(mapStateToProps)(Products)