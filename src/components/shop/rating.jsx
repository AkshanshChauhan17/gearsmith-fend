import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import url_main from "../../functions/url"

export default function Rating({i, data, user_data, rRDef}) {
    return <div className="oth-review-card" key={i}>
        <div className="top-user-info">
            <img src={url_main + data.rating_image + "?r=100"} alt="" />
            <div className="top-right">
                <div className="title">{data.user_email}</div>
                <div className="subtitle">{data.rating_timestamp.split("T")[0]}</div>
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
        {
            data.comment !== "" && <div className="top-middle">
                {
                    data.comment
                }
            </div>
        }
        {
            user_data.email===data.user_email && <div className="bottom-controls">
                <span className="flex center gap-5" onClick={()=>rRDef(data.product_id)}><AiFillDelete /> Remove</span>
            </div>
        }
    </div>
}