import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ProductCard({rotate, spd, data, pagingIndex, index, pushRef, image, name, price, isTex, url, scDef, spiDef}) {
    const cardRef = useRef(null)
    useEffect(()=>{
        pushRef(cardRef)
    }, [])
    return (
        <div className={index===pagingIndex ? "product-card focused" : "product-card" } ref={cardRef} onClick={()=>{scDef(index); spiDef(index);}}>
            <div className="product-dp-ar">
                <img className="product-dp" src={image} alt="" loading="lazy"/>
                <div className="product-dp-url">
                    <Link className="text" to={url} onClick={()=>spd({data, image})}>GET <AiOutlineArrowRight className="arrow" /></Link>
                </div>
            </div>
            <div className="product-data">
                <div className="product-heading">{name}</div>
                <div className="product-price">{price}</div>
                <br />
                <div className="product-small-text">{isTex ? "Sales Tex Included" : null}</div>
            </div>
        </div>
    )
}