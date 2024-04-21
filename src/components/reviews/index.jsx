import { useEffect, useState } from "react"
import { getRequest } from "../../functions/get.req"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import Graph from "../graph/line"
import { Link } from "react-router-dom"

export default function Review() {
    const [ratingList, setRatingList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [ratingIndex, setRatingIndex] = useState(1)
    const [graphData, setGraphData] = useState({
        lb: [],
        dt: []
    })

    useEffect(()=>{
        getRequest("product/rate/all/" + ratingIndex)
            .then((list)=>{
                const newRatingList = [...ratingList, ...list]
                setRatingList(newRatingList)
                var all_rating = []
                newRatingList.map((r)=>{
                    all_rating.push(r.rating)
                })
                var all_productName = []
                newRatingList.map((n)=>{
                    all_productName.push(new Date(n.rating_timestamp).toDateString())
                })
                setGraphData({
                    dt: all_rating,
                    lb: all_productName
                })
                setIsLoading(false)
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
        <div className="review">
        <div className="graph"><Graph dt={graphData.dt} lb={graphData.lb} /></div>
        <div className="review-ar">
            {
                ratingList.map((d, i)=>{
                    return <div className="rating-card" key={i}>
                        <div className="rating-card-top">
                            <div className="product-image" style={{backgroundImage: `url(${d.media})`, width: 100, height: 100, backgroundRepeat: "no-repeat"}}></div>
                            <div className="info">
                                <div className="name">{d.name}</div>
                                <Link to={"/product/" + d.product_id} className="id">{d.product_id}</Link>
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
                        {
                            d.comment!=="" && d.comment!==null ? <div className="comment">{d.comment}</div> : null
                        }
                    </div>
                })
            }
            {
                isLoading ? <div className="loading-ar">
                    <div className="loader"></div>
                </div> : <div className="load-btn" onClick={()=>{setRatingIndex(ratingIndex+1); setIsLoading(true);}}>load more...</div>
            }
        </div>
        </div>
    )
}