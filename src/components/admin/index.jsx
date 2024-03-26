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

        const [media, setMedia] = useState([])

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

        const handleDeleteImage = (index)=>{
            const newMedia = [...media]
            const updateMedia = newMedia.splice(index, 1);
            setMedia(updateMedia)
        }

        const handleImageChange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
    
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    // Resize for small image
                    const smallWidth = 100; // Set your desired width
                    const smallHeight = (img.height / img.width) * smallWidth;
                    canvas.width = smallWidth;
                    canvas.height = smallHeight;
                    ctx.drawImage(img, 0, 0, smallWidth, smallHeight);
                    const smallBase64 = canvas.toDataURL('image/jpeg');
    
                    // Resize for medium image
                    const mediumWidth = 300; // Set your desired width
                    const mediumHeight = (img.height / img.width) * mediumWidth;
                    canvas.width = mediumWidth;
                    canvas.height = mediumHeight;
                    ctx.drawImage(img, 0, 0, mediumWidth, mediumHeight);
                    const mediumBase64 = canvas.toDataURL('image/jpeg');
    
                    // Resize for large image
                    const largeWidth = 600; // Set your desired width
                    const largeHeight = (img.height / img.width) * largeWidth;
                    canvas.width = largeWidth;
                    canvas.height = largeHeight;
                    ctx.drawImage(img, 0, 0, largeWidth, largeHeight);
                    const largeBase64 = canvas.toDataURL('image/jpeg');
    
                    const newMedia = [...media, {
                        small: smallBase64,
                        medium: mediumBase64,
                        large: largeBase64
                    }]
                    setMedia(newMedia);
                };
            };
    
            reader.readAsDataURL(file);
        };

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
                            <div className="images-selected">
                                {
                                    media.map((img, i)=>{
                                        return <img src={img.small} className="image" key={i} onClick={()=>handleDeleteImage(i-1)}/>
                                    })
                                }
                            </div>
                            <div className="image-uploader">
                                <input type="file" accept="image/*" onChange={(e)=>handleImageChange(e)} />
                                <input type="button" className="button" value="Delete All Images" />
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