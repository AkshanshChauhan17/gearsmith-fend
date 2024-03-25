import { isEmptyObject } from "jquery"
import { useEffect, useState } from "react"
import {postNewProduct, uploadProductImage} from "./admin.functions/post.reqs"

export default function Admin() {
    const AddProduct = ()=> {
        const [colorList, setColorList] = useState([])
        const [focusField, setFocusField] = useState()
        const [colorCode, setColorCode] = useState("#000001")
        const [colorName, setColorName] = useState("")

        const [productSummary, setProductSummary] = useState("")
        const [name, setName] = useState("")
        const [price, setPrice] = useState(0)

        var [sizeList, setSizeList] = useState([])

        const [selectSize1, setSelectSize1] = useState({})
        const [selectSize2, setSelectSize2] = useState({})
        const [selectSize3, setSelectSize3] = useState({})
        const [selectSize4, setSelectSize4] = useState({})

        const [loading, setLoading] = useState(false)

        const [noOfImages, setNoOfImages] = useState([])
        const [noOfImagePaths, setNoOfImagePaths] = useState([])

        const resetAll = ()=> {
            setColorList([])
            setFocusField()
            setColorCode("#000001")
            setColorName("")
            setProductSummary("")
            setName("")
            setPrice(0)
            setSizeList([])
            setSelectSize1({})
            setSelectSize2({})
            setSelectSize3({})
            setSelectSize4({})
            setLoading(false)
            setNoOfImages([])
            setNoOfImagePaths([])
        }

        const availableSize = [
            {
                size_name: "Small",
                size: "32 (29-32)"
            },
            {
                size_name: "Medium",
                size: "34 (32-34)"
            },
            {
                size_name: "Large",
                size: "36 (35-36)"
            },
            {
                size_name: "XL",
                size: "38 (37-38)"
            }
        ]

        const addColor = ()=>{
            const newColor = [...colorList, {color_name: colorName, color_code: colorCode}]
            setColorList(newColor)
        }

        useEffect(()=>{
            const newSizeList = [selectSize1, selectSize2, selectSize3, selectSize4]
            setSizeList(newSizeList)
        }, [selectSize1, selectSize2, selectSize3, selectSize4])

        const handleNoOfImages = (val)=> {
            var newNoOfImage = [];
            for(var i=0; i<val; i++) {
                newNoOfImage.push(i)
            }
            setNoOfImages(newNoOfImage);
        }

        const handleImagePaths = (path)=>{
            var newImagePath = [...noOfImagePaths, path];
            setNoOfImagePaths(newImagePath);
        }

        const handleFormSubmit = async()=> {
            await postNewProduct(name, price, [], colorList, sizeList, productSummary)
                .then((res)=>{
                    if(res.affectedRows!=0) {
                        setLoading(false)
                    }
                })
                .catch(error=>setLoading(false))
                .finally(()=>setLoading(true))

            noOfImagePaths.map(async (file)=>{
                await uploadProductImage(name, file, file.name)
                    .then((res)=>{
                        if(res.affectedRows!=0) {
                            alert("Product Uploaded Successfully!")
                            setLoading(false)
                        } else {
                            alert("Something Wrong!")
                            setLoading(false)
                        }
                    })
                    .catch((err)=>setLoading(false))
                    .finally(()=>{
                        setLoading(false)
                        resetAll()
                    })
            }) 
        }

        if(loading) {
            return <div className="loading-ar">
                <div className="loader"></div>
            </div>
        }

        return(
            <div className="add-product-section">
                <form action="#" onSubmit={()=>{handleFormSubmit(); setLoading(true);}}>
                    <div>
                        <div className="form-heading">Product Details</div>
                        <div className="form-subheading">Enter Product Details Like: Name, Price, Product Summary</div>
                    </div>
                    <br />
                    <div className="product-details">
                        <fieldset className={focusField===0 || name!="" ? "focus-field" : "field"}>
                            <legend>Name</legend>
                            <input type="text" required onFocus={()=>setFocusField(0)} onBlur={()=>setFocusField(name ==="" ? 400 : 0)} onChange={(e)=>setName(e.target.value)} />
                        </fieldset>
                        <fieldset className={focusField===1 || price!="" ? "focus-field" : "field"}>
                            <legend>Price</legend>
                            <input type="tel" required onFocus={()=>setFocusField(1)} onBlur={()=>setFocusField(price ==="" ? 400 : 1)} onChange={(e)=>setPrice(e.target.value)}/>
                        </fieldset>
                        <fieldset className={focusField===2 || productSummary!="" ? "focus-field" : "field"}>
                            <legend>Product Summary</legend>
                            <input type="text" required onFocus={()=>setFocusField(2)} onBlur={()=>setFocusField(productSummary ==="" ? 400 : 2)} onChange={(e)=>setProductSummary(e.target.value)} />
                        </fieldset>
                    </div>
                    <br />
                    <br />
                    <div>
                        <div className="form-heading">Available Colors and Sizes</div>
                        <div className="form-subheading">Choose Available Colors and Sizes For Your Product</div>
                    </div>
                    <br />
                    <div className="color-select-ar">
                        <div className="select-color">
                            <input type="color" onChange={(e)=>setColorCode(e.target.value)} value={colorCode} />
                            <input className="color-name" type="text" placeholder="Color Name" onChange={(e)=>setColorName(e.target.value)} value={colorName} />
                            <input className="button" disabled={colorCode==="#000001" || colorName.length<=0} type="button" value={colorCode==="#000001" || colorName.length<=0 ? "---" : "Add" } onClick={()=>{addColor(); setColorName(""); setColorCode("#000001");}} />
                            <input className="button" type="button" value="Clear All" disabled={colorList.length<=0} onClick={()=>setColorList([])} />
                        </div>
                    </div>
                    {
                        colorList.length>0 && 
                            <div className="color-list-section">
                                Selected Colors:
                                {
                                    colorList.map((color_obj, i)=>{
                                        return <div className="selected-color" key={i} style={{backgroundColor: color_obj.color_code}}><span style={{color: color_obj.color_code, filter: "invert(1)"}}>{color_obj.color_name}</span></div>
                                    })
                                }
                            </div>
                    }
                    <br />
                    <div className="size-select-ar">
                        Select Available Size:
                        <br /><br />
                        <div className="selected-size-ar"> 
                            {
                                sizeList.map((s, i)=>{
                                    if(s.size_name === undefined && s.size === undefined) {
                                        return null
                                    }
                                    return <span className="selected-size" key={i}>{s.size_name + " " + s.size}</span>
                                })
                            }
                        </div>
                        <br />
                        <br />
                        <div className="select-sizes">
                            {
                                availableSize.map((size, i)=>{
                                    const sizeListElement = [setSelectSize1, setSelectSize2, setSelectSize3, setSelectSize4]
                                    return (
                                        <div className="select-size" key={i}>
                                            <div className="size">
                                                <input type="checkbox" onChange={(e)=>sizeListElement[i](e.target.checked ? {size_name: size.size_name, size: size.size} : {})} />
                                                {size.size_name} {size.size}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <br />
                    <br />
                    <div>
                        <div className="form-heading">Upload Images</div>
                        <div className="form-subheading">Upload Images for Your Product</div>
                        <br />
                        <div className="image-upload-ar">
                            <div className="image-uploader">
                                <input type="number" min={1} max={10} disabled={noOfImagePaths.length>0} required onChange={(e)=>{handleNoOfImages(e.target.value)}}/>
                                {
                                    noOfImages.map((image_inp, i)=>{
                                        return  <input type="file" accept="image/*" key={i} required hidden={noOfImagePaths[i]} onChange={(e)=>handleImagePaths(e.target.files[0])} />
                                    })
                                }
                            </div>
                            <div className="images-selected">
                                {
                                    noOfImagePaths.map((img, i)=>{
                                        return <img src={URL.createObjectURL(img)} className="image" key={i}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <br />
                    <input type="submit" className="button" value="Add New Product" />
                </form>
            </div>
        )
    }
    return(
        <div className="admin">
            <AddProduct />
        </div>
    )
}