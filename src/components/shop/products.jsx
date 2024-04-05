import { isEmptyObject, isNumeric } from "jquery"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getRequest } from "../../functions/get.req"
import { addProductToCart } from "../cart/post.reqs"
import { AiFillLock, AiOutlineLoading, AiOutlineRollback, AiOutlineSend, AiOutlineSwapRight } from "react-icons/ai"
import { Link } from "react-router-dom"
import Rating from "./rating"
import user from "../../assets/images/unnamed.webp"
import { postRating } from "./rating.post"

function Products({ud}) {
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
    const [ratingLoad, setRatingLoad] = useState(false)
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
            const p_rating =  await fetchData("product/rate/percentage/" + productData.product_id, setFiveStartRatingPercentage)
            return calculateAverageRating(p_rating)
        } catch (error) {
            null
        }
    }

    const handleRating = async()=>{
        setRatingLoad(true)
        await postRating(ud.email, JSON.parse(ud.meta).profile_photo.small, productData.product_id, rating, comment)
            .then((e)=>{
                if(e.affectedRows>=1) {
                    setRating(0)
                    setComment("")
                }
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
        })
        .catch(err => console.error(err))
        window.scrollTo(0, 0)
    }, [])

    if(isEmptyObject(productData)) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return(
        <div className="product-view-ar">
            <Link to={"/shop"} className="url-top">
                <AiOutlineRollback /> {"Shop/Product/" + productData.name}
            </Link>
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
                    <div className="product-price">₹ {productData.price}</div>
                    <div className="product-text">Sales Tex Included</div>
                    <br />
                    <div className="product-content">
                        {
                            productData.product_summary
                        }
                    </div>
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
                            <select name="" id="" required value={productSizeSelected} onChange={(e)=>setProductSizeSelected(e.target.value)}>
                                <option value="default">Original</option>
                                {
                                    productSize.map((ps, i)=>{
                                        if(isEmptyObject(ps)) {
                                            return null
                                        }
                                        return <option value={ps.size_name + " " + ps.size} key={i}>{ps.size_name + " " + ps.size}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <br />
                    {
                        quantityVerification || productSizeSelected!=null ? 
                        <div className="submit-ar">
                            <input type="number" min={1} max={100} required value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            <button className="button-atoc" disabled={addToCartStatus.status} onClick={()=>handleAddToCart()}>
                                {
                                    onClickAddToCart ? <AiOutlineLoading className="loader" /> : addToCartStatus.message
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
            <hr />
            <div className="review-heading">
                <div className="heading-text">Make Reviews</div> <AiOutlineSwapRight className="icon" />
            </div>
            <div className="review-section-inputs">
                <div className="review-top">
                <div className="stars">
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
                <div className="profile">
                    {ud.email}
                    <img src={JSON.parse(ud.meta).profile_photo.small} alt="" />
                </div>
                </div>
                <textarea cols="30" rows="10" className="comment" value={comment} placeholder="comment here" onChange={(e)=>setComment(e.target.value)}></textarea>
                <div className="controls">
                <button className="comment-submit" onClick={()=>handleRating()}>Post<AiOutlineSend /></button>
                </div>
            </div>
            <br />
            <hr />
            <div className="review-heading">
                <div className="heading-text">View Reviews</div> ({ratingData.averageRating}) <AiOutlineSwapRight className="icon" />
            </div>
            <br />
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
                                        const ratingValue = i + 1
                                        return (
                                            <span
                                            key={i} 
                                            className={i < Math.round(fiveStarRatingPercentage.averageRating) ? "filled" : "empty"}
                                            onClick={()=>handleClick(ratingValue)}>
                                                &#9733;
                                            </span>
                                        )
                                    })
                                } ({fiveStarRatingPercentage.averageRating}/5)
                            </div>
                        }
                    </div>
                    <div className="review-graph">
                    <div className="meter-ar">
                        <div className="meter-star">&#9733; &#9733; &#9733; &#9733; &#9733;</div>
                        <meter className="meter" min={0} max={100} value={fiveStarRatingPercentage.newRatingPercentage.five_star} />
                        <div className="meter-text">({fiveStarRatingPercentage.newRatingPercentage.five_star})</div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="meter-ar">
                        <div className="meter-star">&#9733; &#9733; &#9733; &#9733;</div>
                        <meter className="meter" min={0} max={100} value={fiveStarRatingPercentage.newRatingPercentage.four_star} />
                        <div className="meter-text">({fiveStarRatingPercentage.newRatingPercentage.four_star})</div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="meter-ar">
                        <div className="meter-star">&#9733; &#9733; &#9733;</div>
                        <meter className="meter" min={0} max={100} value={fiveStarRatingPercentage.newRatingPercentage.three_star} />
                        <div className="meter-text">({fiveStarRatingPercentage.newRatingPercentage.three_star})</div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="meter-ar">
                        <div className="meter-star">&#9733; &#9733;</div>
                        <meter className="meter" min={0} max={100} value={fiveStarRatingPercentage.newRatingPercentage.two_star} />
                        <div className="meter-text">({fiveStarRatingPercentage.newRatingPercentage.two_star})</div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="meter-ar">
                        <div className="meter-star">&#9733;</div>
                        <meter className="meter" min={0} max={100} value={fiveStarRatingPercentage.newRatingPercentage.one_star} />
                        <div className="meter-text">({fiveStarRatingPercentage.newRatingPercentage.one_star})</div>
                    </div>
                    </div>
                    </div>
                    <div className="all-rating">
                        {
                            ratingData.map((data, i)=>{
                                return <Rating data={data} i={i} />
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