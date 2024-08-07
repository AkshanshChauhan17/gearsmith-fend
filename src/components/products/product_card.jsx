import { useEffect, useRef, useState } from "react";
import { AiFillLeftSquare, AiOutlineArrowRight, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProgressiveImage from "../image";

export default function ProductCard({rotate, spd, data, pagingIndex, index, pushRef, image, name, price, isTex, url, scDef, spiDef}) {
    const cardRef = useRef(null)
    useEffect(()=>{
        pushRef(cardRef)
    }, [])
    return (
        <div className={index===pagingIndex ? "product-card focused" : "product-card" } ref={cardRef} onClick={()=>{scDef(index); spiDef(index);}}>
            <div className="product-dp-ar">
                <ProgressiveImage lowResolutionSrc={image + "?r=100"} highResolutionSrc={image + "?r=1000"} className="product-dp" />
                <div className="product-dp-url">
                    <Link className="text" to={url} onClick={()=>spd({data, image})}>VIEW <AiOutlineArrowRight className="arrow" /></Link>
                </div>
            </div>
            <div className="product-data">
                <div className="product-heading"><span className="under">{name.split("")[0]}</span>{name.slice(1, 200)}</div>
                <div className="product-summary">{data.product_summary.split(" ").length>20 ? data.product_summary.split(" ").splice(0, 20).join(" ") + "..." : data.product_summary.split(" ").splice(0, 20).join(" ") + "."}</div>
                <div className="product-small-text">{isTex ? "Sales tax Included" : null}</div>
            </div>
        </div>
    )
}