import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"

export default function Rating({i, data, user_data, rRDef}) {
    return <div className="oth-review-card" key={i}>
        <div className="top-user-info">
            <img src={data.rating_image} alt="" />
            <div className="top-right">
                <div className="title">{data.user_email}</div>
                <div className="subtitle">{data.rating_timestamp.split("T")[0]}</div>
            </div>
        </div>
        <br />
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
        <div className="bottom-controls">
            {
                user_data.email===data.user_email && <span className="flex center gap-5" onClick={()=>rRDef(data.product_id)}><AiFillDelete /> Remove</span>
            }
        </div>
    </div>
}