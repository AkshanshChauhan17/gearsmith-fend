import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export default function Review() {
    const [ratingList, setRatingList] = useState([])
    const [ratingIndex, setRatingIndex] = useState(0)

    useEffect(()=>{
        getRequest("product/rate/all/" + ratingIndex)
            .then((list)=>{
                const newRatingList = [...ratingList, ...list]
                setRatingList(newRatingList)
                console.log(list)
            }).catch((err)=>{
                console.log(err)
            })
    }, [ratingIndex])
    
    if(ratingList.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="review-ar">
            {
                ratingList.map((d, i)=>{
                    return <div className="rating-card" key={i}>
                        <div className="rating-card-top">
                            <div className="product-image" style={{backgroundImage: `url(${d.media})`, width: 100, height: 100, backgroundRepeat: "no-repeat"}}></div>
                            <div className="info">
                                <div className="name">{d.name}</div>
                                <div className="id">{d.product_id}</div>
                                <div className="rating">
                                    {
                                        [...Array(5)].map((_, i)=>{
                                            if(d.rating > i) { 
                                                return <AiFillStar />
                                            } return <AiOutlineStar />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="user-info">
                        <div className="user-icon" style={{backgroundImage: `url(${d.rating_image})`, backgroundRepeat: "no-repeat"}}></div>
                            <div className="user-info-top">
                                <div className="user-name">{d.user_email}</div>
                                <div className="time">{d.rating_timestamp}</div>
                            </div>
                        </div>
                        <summary>{d.comment}</summary>
                    </div>
                })
            }
            <div className="load-btn" onClick={()=>setRatingIndex(ratingIndex+1)}>load more...</div>
        </div>
    )
}