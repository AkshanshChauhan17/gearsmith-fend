import { isEmptyObject } from "jquery"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getRequest } from "../../functions/get.req"

function Products({product_data}) {
    const [productColorIndex, setProductColorIndex] = useState(0)
    const [productColor, setProductColor] = useState([])
    const [productImages, setProductImages] = useState([])
    const [productData, setProductData] = useState()
    const [productSize, setProductSize] = useState([])
    const [productsLength, setProductsLength] = useState(0)
    const [productImage, setProductImage] = useState([])
    const [loading, setLoading] = useState(true)

    const getImage = (url, index)=>{
        getRequest("media/image?image_path=" + url)
            .then((image)=>{
                productImages.push(image)
                if(index===0) {
                    setProductImage(image.images[2].base64)
                }
                if(index>=productsLength) {
                    setLoading(false)
                }
                setProductImages(productImages)
            }).catch(err=>console.error(err))
            .finally(()=>setProductsLength(index))
    }

    useEffect(() => {
        Promise.all([
            getRequest("product/" + window.location.href.split("/").splice(-1)),
            getRequest("product/image/" + window.location.href.split("/").splice(-1))
        ])
        .then(([productResponse, imageResponse]) => {
            setProductData(productResponse)
            setProductColor(JSON.parse(productResponse.color_list))
            setProductSize(JSON.parse(productResponse.size_list))

            const imagePromises = imageResponse.map((image, i) => getImage(image.url, i))
            return Promise.all(imagePromises)
        })
        .catch(err => console.error(err))
    }, [])

    if(loading & isEmptyObject(productData)) {
        return <div className="loading-ar">
            <div className="loader"></div>
        </div>
    }

    return(
        <div className="product-view">
            <div className="product-view-left">
                <div className="product-view-image-slider">
                <img className="product-view-image" src={productImage} alt="" />
                </div>
                <br />
                <div className="product-view-image-slider-controls">
                    {
                        productImages.map((image, i)=>{
                            return <img className={productImage===image.images[2].base64 ? "product-view-control-image-active" : "product-view-control-image"} onClick={()=>setProductImage(image.images[2].base64)} loading="lazy" key={i} src={image.images[0].base64} /> 
                        })
                    }
                </div>
            </div>
            <div className="product-view-right">
                <div className="product-heading">{productData.name}</div>
                <br />
                <div className="product-content">
                    {
                        productData.product_summary
                    }
                </div>
                <br />
                <div className="product-price">₹ {productData.price}</div>
                <div className="product-text">Sales Tex Included</div>
                <br />
                <div className="product-color-section">
                    {productColor.length>0 && <div className="product-color-text">Color: {productColor[productColorIndex].color_name}</div>}
                    <div className="product-color-selection-ar">
                        {
                            productColor.map((col, i)=>{
                                return <div className="product-color" key={i} onClick={()=>setProductColorIndex(i)} style={{backgroundColor:  col.color_code}}></div>
                            })
                        }
                    </div>
                </div>
                <br />
                <div className="drop-ar">
                    <div className="drop-section">
                        Size
                        <select name="" id="">
                            {
                                productSize.map((ps, i)=>{
                                    if(isEmptyObject(ps)) {
                                        return null
                                    }
                                    return <option value={ps.size_name} key={i}>{ps.size_name + " " + ps.size}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="drop-section">
                        Quantity
                        <input type="number" min={1} max={100}/>
                    </div>
                </div>
                <br />
                <div className="submit-ar">
                    <button className="button-atoc">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state)=> ({
    product_data: state.product.product_data,
})

export default connect(mapStateToProps)(Products);