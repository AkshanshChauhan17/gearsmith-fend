import { isEmptyObject, isNumeric } from "jquery"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getRequest } from "../../functions/get.req"
import { addProductToCart } from "../cart/post.reqs"
import { AiFillLock, AiOutlineLoading, AiOutlineRollback, AiOutlineSend, AiOutlineSwapRight } from "react-icons/ai"
import user from "../../assets/images/unnamed.webp"
import { Link } from "react-router-dom"

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
    const [rating, setRating] = useState(0)

    const handleClick = (selectedRating) => {
        setRating(selectedRating)
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
            .finally(()=>setOnClickAddToCart(false))
    }

    const reviews = [
          {
            "id": 1,
            "comment": "Great product! Really satisfied with the quality.",
            "email": "user1@example.com",
            "image": "https://example.com/user1_avatar.jpg",
            "rating": 5
          },
          {
            "id": 2,
            "comment": "Excellent service. Prompt delivery and good customer support.",
            "email": "user2@example.com",
            "image": "https://example.com/user2_avatar.jpg",
            "rating": 5
          },
          {
            "id": 3,
            "comment": "Absolutely fantastic! Couldn't be happier with my purchase.",
            "email": "user3@example.com",
            "image": "https://example.com/user3_avatar.jpg",
            "rating": 4
          },
          {
            "id": 4,
            "comment": "Amazing experience! The product exceeded my expectations.",
            "email": "user4@example.com",
            "image": "https://example.com/user4_avatar.jpg",
            "rating": 3
          },
          {
            "id": 5,
            "comment": "Top-notch quality and superb customer service!",
            "email": "user5@example.com",
            "image": "https://example.com/user5_avatar.jpg",
            "rating": 5
          },
          {
            "id": 6,
            "comment": "Incredible product! Will definitely recommend it to others.",
            "email": "user6@example.com",
            "image": "https://example.com/user6_avatar.jpg",
            "rating": 4
          },
          {
            "id": 7,
            "comment": "Outstanding service! Fast shipping and great communication.",
            "email": "user7@example.com",
            "image": "https://example.com/user7_avatar.jpg",
            "rating": 5
          },
          {
            "id": 8,
            "comment": "Exceptional quality and value for money.",
            "email": "user8@example.com",
            "image": "https://example.com/user8_avatar.jpg",
            "rating": 5
          },
          {
            "id": 9,
            "comment": "Brilliant experience! Will definitely purchase again.",
            "email": "user9@example.com",
            "image": "https://example.com/user9_avatar.jpg",
            "rating": 5
          },
          {
            "id": 10,
            "comment": "Absolutely thrilled with my purchase! 5 stars all the way.",
            "email": "user10@example.com",
            "image": "https://example.com/user10_avatar.jpg",
            "rating": 5
          }
        ]

    useEffect(()=>{
        if(quantity<=0 || !isNumeric(quantity)) {
            return setQuantityVerification(false)
        }
        return setQuantityVerification(true)
    }, [quantity])

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
                Your Reviews <AiOutlineSwapRight className="icon" />
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
                <textarea cols="30" rows="10" className="comment" placeholder="comment here"></textarea>
                <button className="comment-submit">Post <AiOutlineSend /></button>
            </div>
            <br />
            <hr />
            <div className="review-heading">
                Other Reviews (10) <AiOutlineSwapRight className="icon" />
            </div>
            <div className="oth-review">
            {
                reviews.map((data, i)=>{
                    return <div className="oth-review-card" key={i}>
                            <div className="top-user-info">
                                <img src={user} alt="" />
                                <div className="top-right">
                                    <div className="title">{data.email}</div>
                                    <div className="subtitle">name</div>
                                </div>
                            </div>
                            <div className="stars">
                                {
                                    [...Array(5)].map((_, i)=>{
                                        const ratingValue = i + 1
                                        return (
                                            <span
                                            key={i} 
                                            className={ratingValue <= data.rating ? "filled" : "empty"}>
                                                &#9733;
                                            </span>
                                        )
                                    })
                                } ({data.rating}/5)
                            </div>
                            <div className="top-middle">
                                {
                                    data.comment
                                }
                            </div>
                    </div>
                })
            }
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    product_data: state.product.product_data,
})

export default connect(mapStateToProps)(Products)