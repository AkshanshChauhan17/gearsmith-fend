import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineArrowRight, AiOutlineEye, AiOutlineHeart, AiOutlineLike, AiOutlineShareAlt, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getRequest } from "../../functions/get.req";
import { isEmptyObject } from "jquery";

export default function ProductSmallCard({spd, data, image, url, name, price, isHide, pg, previous_price}) {
    const [rating, setRating] = useState({})
    const [ratingSum, setRatingSum] = useState()

    const fetchData = async (url, setDataFunction) => {
        try {
            if (data.length===0) {
                throw "false"
            }
    
            const d = await getRequest(url)
            setDataFunction(d)
            setRatingSum(d.newRatingPercentage.five_star + d.newRatingPercentage.four_star + d.newRatingPercentage.three_star + d.newRatingPercentage.two_star + d.newRatingPercentage.one_star)
            return d
        } catch (error) {
            throw error
        }
    }
    

    const getRatingPercentage = async () => {
        try {
            fetchData("product/rate/percentage/" + data.product_id, setRating)
        } catch (error) {
            null
        }
    }
    
    useEffect(() => {
      getRatingPercentage()
    //   console.log("dd")
    }, [data])
    

    async function handleShareButtonClick () {
        var content = `Product Name: ${name}\n Price: ${price}\nshop now visit -> ${window.location.hostname + url}`
        try {
            if(window.navigator.share) {
                await window.navigator.share({
                    title: data.name, 
                    text: data.product_summary, 
                    url: url
                })
            } else {
                try {
                    await window.navigator.clipboard.writeText(content)
                    alert("Copied Successfully: " + content)
                } catch (error) {
                    alert(error + content)
                }
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Link to={url} onClick={()=>spd({data, image})} className="product-small-card text link">
            {
                <div className="product-dp-ar">
                    <img className="product-dp" src={image} alt="" loading="lazy" />
                </div>
            }
            <div className="product-data">
                <Link className="product-heading" to={url} onClick={()=>spd({data, image})}>{name}</Link>
                <div className="product-rating">
                    {
                        [...Array(5)].map((_, i)=>{
                            const ratingValue = i + 1
                            if(ratingValue <= rating.averageRating) {
                                return <AiFillStar key={i} />
                            } else {
                                return <AiOutlineStar key={i} />
                            }
                        })
                    } {rating.averageRating===null ? <div className="text">No Reviews</div> : <div className="text">{ratingSum} Reviews</div>}
                </div>
                <div className="product-price">{previous_price === price || previous_price===0 ? price : <><s className="prv-price">₹{previous_price}</s> {price} <div className="discount">{data.discount} Discount</div></>}</div>
            </div>
            <div className="color-available">
            {
                JSON.parse(data.color_list).map((e, i)=>{
                    return <div className="color" key={i} style={{backgroundColor: e.color_code}} title={e.color_name}></div>
                })
            }
            </div>
            {/* <div className="product-bottom">
                <Link className="text view-button" to={url} onClick={()=>spd({data, image})}>VIEW NOW</Link>
                <div className="like-button" onClick={handleShareButtonClick}> SHARE NOW </div>
            </div> */}
        </Link>
    )
}