import { useEffect, useRef, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getRequest } from "../../functions/get.req";

export default function ProductCard({rotate, spd, data, pagingIndex, index, pushRef, image, name, price, isTex, url}) {
    const cardRef = useRef(null)
    const [productImage, setProductImage] = useState([])
    useEffect(()=>{
        pushRef(cardRef)
        getRequest(image)
            .then((data)=>setProductImage(data))
            .catch((err)=>console.error(err))
    }, [])
    return (
        <>
            {
                productImage.images ?
                    <div className={index===pagingIndex ? "product-card focused" : "product-card" } ref={cardRef}>
                        <div className="product-dp-ar">
                            <img className="product-dp" src={productImage.images[1].base64} alt="" loading="lazy"/>
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
                :
                null
            }
        </>
    )
}