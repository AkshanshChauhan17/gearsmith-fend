import { useState } from "react"
import { AiFillLike, AiOutlineLike } from "react-icons/ai"

export default function Rating({i, data, user}) {
    const [isLike, setIsLike] = useState(true)
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
        {/* <br />
        <div className="bottom-controls">
            {
                isLike ?
                    <AiOutlineLike className="like-button" onClick={()=>setIsLike(false)} />
                :
                    <AiFillLike className="like-button" onClick={()=>setIsLike(true)} />
            }
        </div> */}
    </div>
}