import { AiFillCaretLeft, AiFillCaretRight, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCaretRight, AiOutlineDown, AiOutlineLeft, AiOutlineRight, AiOutlineUp } from "react-icons/ai"
import ProductCard from "../products/product_card"
import ProductSmallCard from "../products/product_small_card"
import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { setProductData } from "../../redux/store/actions"
import { getRequest, getRequestStream } from "../../functions/get.req"
import { MdClose, MdMenu, MdMenuOpen } from "react-icons/md"
import { BsMenuDown, BsMenuUp } from "react-icons/bs"
import url_main from "../../functions/url"


function Accessories({setProductData, product_data}) {
    const [pagingIndex, setPagingIndex] = useState(0)
    const [allProduct, setAllProduct] = useState([])
    const [allNewArrivals, setAllNewArrivals] = useState([])
    const [featureVisible, setFeatureVisible] = useState(false)
    const [allProductDefault, setAllProductDefault] = useState([])
    const [filter, setFilter] = useState("--filter--")
    const [zoomProduct, setZoomProduct] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const cardRef = useRef([])
    const [page, setPage] = useState(1)
    const products_heading = useRef(null)

    const scrollToProductHeading = ()=>{
        products_heading.current.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(()=>{
        getRequestStream("product?page=" + page)
            .then((data)=>{
                setAllProduct(data.data)
                setTotalPages(data.total)
                setAllProductDefault(data.data)
            })
        getRequest("product/new_arrive")
            .then((data)=>setAllNewArrivals(data))
    }, [page])

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

    useEffect(()=>{
        window.scroll(0, 0)
    }, [])

    if(allNewArrivals.length===0) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return (
        <div className="shop">
            <div className="head">
                    <div className="heading" ref={products_heading}>
                        Combo Products
                        <AiFillCaretRight className="icon" />
                    </div>
                </div>
            <div className="middle-block">
                <div className="filters">
                    {
                        featureVisible ?
                        <div className="features-btn" onClick={()=>setFeatureVisible(false)}>
                            <MdMenuOpen size={20} />
                        </div> : <div className="features-btn" onClick={()=>setFeatureVisible(true)}>
                            <MdMenu size={20} />
                        </div>
                    }
                    <div className="items-counter">
                        <b>{
                            allProduct.length
                        }</b> Products in Page <b>{page}</b>
                    </div>
                    <div className="sort-ar">
                        SORT BY: <select value={filter} onChange={(e)=>sortProduct(e.target.value)}>
                            <option value="--filter--">--Filter--</option>
                            <option value="name a to z">Name A to Z</option>
                            <option value="name z to a">Name Z to A</option>
                            <option value="price 0 to 50000">Price Low to High</option>
                            <option value="price 50000 to 0">Price High to Low</option>
                        </select>
                        <select value={zoomProduct} onChange={(e)=>setZoomProduct(e.target.value)}>
                            <option value={1}>Normal</option>
                            <option value={0.6}>Small</option>
                            <option value={0.4}>Small-X</option>
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
                                if(d.name.includes("patch") || d.name.includes("Patch") || d.name.includes("Accessories")) {
                                    return <ProductSmallCard pg={page} spd={feedProductData} previous_price={d.previous_price} data={d} image={url_main + d.media} name={d.name} price={"₹" + d.price} isTex={true} url={"/product/" + d.product_id} key={i}/>
                                }
                            })
                        }
                    </div>
                </div>
                <div className="pagination">
                            {
                                [...Array(totalPages)].map((e, i)=>{
                                    return <div className={page===i+1 ? "selected-page" : "unselected-page"} key={i} onClick={()=>{setPage(i+1); scrollToProductHeading()}}>{i + 1}</div>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Accessories);