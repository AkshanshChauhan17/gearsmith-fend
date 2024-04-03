import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
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
    const [featureVisible, setFeatureVisible] = useState(true)
    const [allProductDefault, setAllProductDefault] = useState([])
    const cardRef = useRef([])

    useEffect(()=>{
        getRequest("product")
            .then((data)=>{
                setAllProduct(data)
                setAllProductDefault(data)
            })
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

    const filterByPrice = (min, max)=>{
        const newProductFilter = allProductDefault.filter(product => product.price >= min && product.price <= max)
        setAllProduct(newProductFilter)
        console.log(newProductFilter)
    }

    if(allProductDefault.length===0 || allNewArrivals.length===0) {
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
                <hr />
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
                <hr />
                <br />
                <div className="filters">
                    {
                        featureVisible ?
                        <div className="features-btn" onClick={()=>setFeatureVisible(false)}>
                            <b>FEATURE</b><AiOutlineLeft />
                        </div> : <div className="features-btn" onClick={()=>setFeatureVisible(true)}>
                            <b>FEATURE</b><AiOutlineRight />
                        </div>
                    }
                    <div className="items-counter">
                        <b>TOTAL PRODUCTS:</b> {
                            allProduct.length
                        }
                    </div>
                    <div className="sort-ar">
                        SORT BY: <select>
                            <option value="name">Name</option>
                            <option value="cost">Cost</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
                <div className="product-feature-ar">
                    <div className="features-ar" style={featureVisible ? {display: ""} : {display: "none"}}>
                        <div className="features">
                            CATEGORY
                            <hr />
                            <div className="feature">
                                <label><input type="radio" name="group-category"/> Accessories</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-category"/> Bag & Pack</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-category"/> Pant</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-category"/> Shirt</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-category"/> Patch</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-category"/> Shorts</label>
                            </div>
                        </div>
                        <div className="features">
                            PRICE
                            <hr />
                            <div className="feature">
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(0, 50000)} /> All</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(100, 500)} /> ₹100 - ₹500</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(500, 1000)} /> ₹500 - ₹1000</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(1000, 5000)} /> ₹1000 - ₹5000</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(5000, 10000)} /> ₹5000 - ₹10000</label>
                            </div>
                            <div className="feature">
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(10000, 50000)} /> ₹10000 - ₹50000</label>
                            </div>
                        </div>
                    </div>
                    <div className="products">
                        {
                            allProduct.map((d, i)=>{
                                return <ProductSmallCard spd={feedProductData} data={d} image={JSON.parse(d.media)[0].medium} name={d.name} price={"₹" + d.price} isTex={true} url={"/product/" + d.product_id} key={i}/>
                            })
                        }
                    </div>
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