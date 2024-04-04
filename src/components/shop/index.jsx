import { AiFillCaretLeft, AiFillCaretRight, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCaretRight, AiOutlineDown, AiOutlineLeft, AiOutlineRight, AiOutlineUp } from "react-icons/ai"
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
    const [filter, setFilter] = useState("--filter--")
    const [zoomProduct, setZoomProduct] = useState(0)
    const cardRef = useRef([])

    useEffect(()=>{
        getRequest("product")
            .then((data)=>{
                setAllProduct(data)
                setAllProductDefault(data)
            })
        getRequest("product/new_arrive")
            .then((data)=>setAllNewArrivals(data))
        window.scrollTo(0, 0)
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
        setFilter("--filter--")
    }

    function sortProduct(type) {
        setFilter(type)
        if(type==="name a to z") {
            const newProductSort1 = allProduct.slice().sort((a, b) => a.name.localeCompare(b.name));
            setAllProduct(newProductSort1)
            console.log(newProductSort1, type)
        } if(type==="price 0 to 50000") {
            const newProductSort2 = allProduct.slice().sort((a, b) => a.price - b.price);
            setAllProduct(newProductSort2)
            console.log(newProductSort2, type)
        } if(type==="name z to a") {
            const newProductSort3 = allProduct.slice().sort((a, b) => b.name.localeCompare(a.name));
            setAllProduct(newProductSort3)
            console.log(newProductSort3, type)
        } if(type==="price 50000 to 0") {
            const newProductSort4 = allProduct.slice().sort((a, b) => b.price - a.price);
            setAllProduct(newProductSort4)
            console.log(newProductSort4, type)
        }
    }

    if(allProductDefault.length===0 || allNewArrivals.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="shop">
            <div className="middle-block">
                <div className="head">
                    <div className="heading">
                        New Arrivals
                        <AiFillCaretRight className="icon" />
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
            <hr />
            <div className="head">
                    <div className="heading">
                        Products
                        <AiFillCaretRight className="icon" />
                    </div>
                    <div className="sub-heading">
                        Here are all Products
                    </div>
                </div>
                <hr />
            <div className="middle-block">
                <div className="filters">
                    {
                        featureVisible ?
                        <div className="features-btn" onClick={()=>setFeatureVisible(false)}>
                            <b>FEATURE CLOSE</b><AiOutlineUp />
                        </div> : <div className="features-btn" onClick={()=>setFeatureVisible(true)}>
                            <b>FEATURE OPEN</b><AiOutlineDown />
                        </div>
                    }
                    <div className="items-counter">
                        <b>TOTAL PRODUCTS:</b> {
                            allProduct.length
                        }
                    </div>
                    <div className="sort-ar">
                        SORT BY: <select value={filter} onChange={(e)=>sortProduct(e.target.value)}>
                            <option value="--filter--">--Filter--</option>
                            <option value="name a to z">Name A to Z</option>
                            <option value="name z to a">Name Z to A</option>
                            <option value="price 0 to 50000">Cost 0 to 50000</option>
                            <option value="price 50000 to 0">Cost 50000 to 0</option>
                        </select>
                        <select value={zoomProduct} onChange={(e)=>setZoomProduct(e.target.value)}>
                            <option value={1}>Zoom at 0x</option>
                            <option value={0.9}>Zoom at -1x</option>
                            <option value={0.8}>Zoom at -2x</option>
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
                                <label><input type="radio" name="group-price" onChange={()=>filterByPrice(0, 500)} /> ₹0 - ₹500</label>
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
                        <div className="features">
                            RATING
                            <hr />
                            <div className="feature">
                                <label>
                                    <input type="radio" name="group-star" value={5} />&#9733; &#9733; &#9733; &#9733; &#9733;
                                </label>
                            </div>
                            <div className="feature">
                                <label>
                                    <input type="radio" name="group-star" value={5} />&#9733; &#9733; &#9733; &#9733;
                                </label>
                            </div>
                            <div className="feature">
                                <label>
                                    <input type="radio" name="group-star" value={5} />&#9733; &#9733; &#9733;
                                </label>
                            </div>
                            <div className="feature">
                                <label>
                                    <input type="radio" name="group-star" value={5} />&#9733; &#9733;
                                </label>
                            </div>
                            <div className="feature">
                                <label>
                                    <input type="radio" name="group-star" value={5} />&#9733;
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="products" style={{zoom: zoomProduct}}>
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