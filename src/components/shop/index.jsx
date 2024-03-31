import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import ProductCard from "../products/product_card"
import ProductSmallCard from "../products/product_small_card"
import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { setProductData } from "../../redux/store/actions"
import { getRequest } from "../../functions/get.req"


function Shop({setProductData, product_data}) {
    const [pagingIndex, setPagingIndex] = useState(0)
    const [allProduct, setAllProduct] = useState([])
    const [allNewArrivals, setAllNewArrivals] = useState([])
    const cardRef = useRef([])

    useEffect(()=>{
        getRequest("product")
            .then((data)=>setAllProduct(data))
        getRequest("product/new_arrive")
            .then((data)=>setAllNewArrivals(data))
    }, [])

    const feedProductData = (d) => {
        setProductData({
            productView: d
        })
    }

    const pushRef = (refElement)=>{
        cardRef.current.push(refElement)
    }

    const scrollToCard = (i)=>{
        cardRef.current[i].current.scrollIntoView({behaver: 'smooth', block: 'center', inline: 'center'})
    }

    if(allProduct.length===0 || allNewArrivals.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="shop">
            <div className="middle-block">
                <div>
                    <div className="heading">
                        New Arrivals
                    </div>
                    <div className="sub-heading">
                        Everything is new and Fresh
                    </div>
                </div>
                <br />
                <br />
                <button className="ctrl-button left" disabled={pagingIndex<=0} onClick={()=>{setPagingIndex(pagingIndex-1); scrollToCard(pagingIndex-1);}}><AiOutlineArrowLeft /></button>
                <div className="new-arrivals">
                    {
                        allNewArrivals.map((d, i)=>{
                            return <ProductCard spd={feedProductData} data={d} pushRef={pushRef} cardRef={cardRef} image={JSON.parse(d.media)[0].medium} name={d.name} price={"₹" + d.price} isTex={true} url={"/product/" + d.product_id} key={i} index={i} pagingIndex={pagingIndex} spiDef={setPagingIndex} scDef={scrollToCard} />
                        })
                    }
                </div>
                <button className="ctrl-button right" disabled={pagingIndex>=allNewArrivals.length -1} onClick={()=>{setPagingIndex(pagingIndex+1); scrollToCard(pagingIndex+1);}}><AiOutlineArrowRight /></button>
                <div className="new-arrivals-slider-controls">
                    <div className="paging">
                        {
                            allNewArrivals.map((x, i)=>{
                                return <div className={pagingIndex===i ? "ring-active" : "ring-inactive"} onClick={()=>{setPagingIndex(i); scrollToCard(i);}} key={i}></div>
                            })
                        }
                    </div>
                </div>
            </div>
            <hr />
            <div className="middle-block">
                <div>
                    <div className="heading">
                        Products
                    </div>
                    <div className="sub-heading">
                        Here are all Products
                    </div>
                </div>
                <br />
                <br />
                <div className="products">
                    {
                        allProduct.map((d, i)=>{
                            return <ProductSmallCard spd={feedProductData} data={d} image={JSON.parse(d.media)[0].medium} name={d.name} price={"₹" + d.price} isTex={true} url={"/product/" + d.product_id} key={i}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    product_data: state.product.product_data,
})

const mapDispatchToProps = (dispatch) => ({
    setProductData: (product_data) => dispatch(setProductData(product_data)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Shop);