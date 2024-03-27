export default function Review({rd}) {
    if(rd.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    console.log(rd)
    
    return (
        <div className="review">
            
        </div>
    )
}