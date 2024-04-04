import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineArrowRight, AiOutlineEye, AiOutlineHeart, AiOutlineLike, AiOutlineShareAlt, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ProductSmallCard({spd, data, image, url, name, price, isTex}) {
    const rating = [1, 1, 1, 1, 0]
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
        <div className="product-small-card">
            {
                <div className="product-dp-ar">
                    <img className="product-dp" src={image} alt="" loading="lazy" />
                </div>
            }
            <div className="product-data">
                <Link className="product-heading" to={url} onClick={()=>spd({data, image})}>{name}</Link>
                <div className="product-price">{price}</div>
                <div className="product-rating">
                    {
                        rating.map((start, i)=>{
                            if(start===1) {
                                return <AiFillStar key={i} />
                            } else {
                                return <AiOutlineStar key={i} />
                            }
                        })
                    }
                    (0)
                </div>
            </div>
            <div className="product-bottom">
                <Link className="text view-button" to={url} onClick={()=>spd({data, image})}>VIEW NOW</Link>
                <div className="like-button" onClick={handleShareButtonClick}> SHARE NOW </div>
            </div>
        </div>
    )
}