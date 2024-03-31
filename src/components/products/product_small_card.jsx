import { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineHeart, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ProductSmallCard({spd, data, image, url, name, price, isTex}) {
    return (
        <div className="product-small-card">
            {
                <div className="product-dp-ar">
                    <img className="product-dp" src={image} alt="" loading="lazy" />
                    <div className="product-dp-url">
                        <Link className="text" to={url} onClick={()=>spd({data, image})}>GET <AiOutlineArrowRight className="arrow" /></Link>
                    </div>
                </div>
            }
            <div className="product-data">
                <div className="product-heading">{name}</div>
                <div className="product-price">{price}</div>
            </div>
            <div className="product-bottom">
                <Link className="text view-button" to={url} onClick={()=>spd({data, image})}>View</Link>
                <AiOutlineShareAlt className="like-button" onClick={async()=>await navigator.share({title: data.name, text: data.product_summary, url: url})} />
            </div>
        </div>
    )
}