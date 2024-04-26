import { useEffect, useState } from "react"
import postNewProduct from "./admin.functions/post.reqs"
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai"
import MyLineChart from "./MyLineChart"

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

        const [uploadSuccess, setUploadSuccess] = useState({
            status: false,
            message: "",
            visible: false
        })

        const [loading, setLoading] = useState(false)

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

        const [imageSelectionLoading, setImageSelectionLoading] = useState(false)

        useEffect(()=>{
            const newSizeList = [selectSize1, selectSize2, selectSize3, selectSize4]
            setSizeList(newSizeList)
        }, [selectSize1, selectSize2, selectSize3, selectSize4])

        const handleFormSubmit = async()=> {
            setLoading(true)
            await postNewProduct(name, price, media, colorList, sizeList, productSummary)
                .then((res)=>{
                    if(res.affectedRows!=0) {
                        setLoading(false)
                        setUploadSuccess({status: true, message: "Product Upload Successfully", visible: true})
                    } else {
                        setLoading(true)
                        setUploadSuccess({status: false, message: "Product Failed to Upload", visible: true})
                    }
                })
                .catch(error=>setLoading(false))
            resetAll()
        }

        const handleDeleteImage = (indexToRemove)=>{
            const updatedMedia = media.filter((_, index)=>index!==indexToRemove)
            setMedia(updatedMedia)
        }

        const addImage = async (file) => {
            return new Promise((resolve, reject) => {
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
        
                        console.log(smallBase64, mediumBase64, largeBase64)

                        resolve({
                            small: smallBase64,
                            medium: mediumBase64,
                            large: largeBase64
                        });
                    };
                };
        
                reader.onerror = (error) => {
                    reject(error);
                };
        
                reader.readAsDataURL(file);
            });
        };
        
        const handleImageChange = async (e) => {
            setImageSelectionLoading(true)
            const files = e.target.files;
            const newMedia = [];
        
            for (const file of [...files]) {
                const image = await addImage(file);
                newMedia.push(image);
            }
        
            setMedia([...newMedia]);
            setImageSelectionLoading(false)
        };
        

        if(loading) {
            return <div className="loading-ar">
                <div className="loader"></div>
            </div>
        }

        if(uploadSuccess.visible) {
            return <div className="success-message flex center" style={{backgroundColor: uploadSuccess.status ? "darkgreen" : "darkred", color: "white", padding: "20px 40px", justifyContent: "space-evenly", fontSize: "30px"}}>
                <AiFillCheckCircle />
                {
                    uploadSuccess.message
                }
                <AiFillCloseCircle style={{cursor: "pointer"}} onClick={()=>setUploadSuccess({
                    status: false,
                    message: "",
                    visible: false
                })} />
            </div>
        }

        return(
            <div className="add-product-section">
                <form action="#" onSubmit={()=>handleFormSubmit()}>
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
                                    imageSelectionLoading ? <div className="loading-ar">
                                        <div className="loader"></div>
                                    </div> :
                                    media.map((img, i)=>{
                                        return <div className="image">
                                            <img src={img.small} className="image" key={i}/>
                                            <AiFillCloseCircle className="cross" onClick={()=>handleDeleteImage(i)} /> 
                                        </div>
                                    })
                                }
                            </div>
                            <div className="image-uploader">
                                <input type="file" accept="image/*" multiple onChange={(e)=>{handleImageChange(e); e.target.value=null}} />
                                <input type="button" className="button" value="Delete All Images" onClick={()=>setMedia([])} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <input type="submit" className="button" value="Add New Product" hidden={media.length===0} />
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