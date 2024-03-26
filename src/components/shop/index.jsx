import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import ProductCard from "../products/product_card"
import ProductSmallCard from "../products/product_small_card"
import { useEffect, useRef, useState } from "react"
import { isEmptyObject } from "jquery"
import { connect } from "react-redux"
import { setProductData } from "../../redux/store/actions"
import { getRequest } from "../../functions/get.req"

const sliderData = [
    {
        "id": "49563f64-0eeb-c6a2-9a6c-b0c1f19f9b87",
        "options": [
            {
                "id": "opt-19",
                "key": "Color"
            },
            {
                "id": "6467f0a2-d0cd-4221-8412-479cd8fd9aa1",
                "key": "Size (Waist) Inches"
            }
        ],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 2499,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "crusader-mk-1",
        "formattedComparePrice": "",
        "formattedPrice": "₹2,499.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Crusader MK.1",
        "media": [
            {
                "url": "63b1df_ed526c3f3cdf496c9de80bf49c00a6c4~mv2.jpg",
                "index": 0,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "1 (1).jpg",
                "height": 3420
            },
            {
                "url": "63b1df_2b478093cdf14c87ba0caeeae73e208c~mv2.jpg",
                "index": 1,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "2.jpg",
                "height": 3420
            },
            {
                "url": "63b1df_f11adfbf2f5f4e6292d6531c9907c758~mv2.jpg",
                "index": 2,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "7.jpg",
                "height": 3420
            },
            {
                "url": "63b1df_3f561f20131640899641d6f6aca0263d~mv2.jpg",
                "index": 3,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "3.jpg",
                "height": 3420
            },
            {
                "url": "63b1df_1bde6cf021304973ad72100be7fbee33~mv2.jpg",
                "index": 4,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "4.jpg",
                "height": 3420
            },
            {
                "url": "63b1df_4318e750f72a482d8a7cc4b924d57645~mv2.jpg",
                "index": 5,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "5.jpg",
                "height": 3420
            },
            {
                "url": "63b1df_9c1ab0b7672b49a1a8ff8d61fb1bf7c9~mv2.jpg",
                "index": 6,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "8.jpg",
                "height": 3420
            },
            {
                "url": "63b1df_b3d330a0c27944bcade3971a155f0d9d~mv2.jpg",
                "index": 7,
                "width": 3420,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "6.jpg",
                "height": 3420
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "621959c6-c044-c8a7-e5df-352e50c116c6",
        "options": [],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 399,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "got-your-six-patch",
        "formattedComparePrice": "",
        "formattedPrice": "₹399.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Got Your Six Patch",
        "media": [
            {
                "url": "63b1df_14c289954f1e480a950eb577b863d77d~mv2.jpg",
                "index": 0,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "got your six poster 1.jpg",
                "height": 3240
            },
            {
                "url": "63b1df_05cd68b77be34ebc86f729e3fc4e3af0~mv2.jpg",
                "index": 1,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "got your six poster 2.jpg",
                "height": 3240
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "62b99fe7-748f-9e50-8fe5-ceaf3bced291",
        "options": [
            {
                "id": "57ce2812-2ef7-4b57-b0e4-a1a9818e2b90",
                "key": "Size (Inch)"
            },
            {
                "id": "opt-19",
                "key": "Color"
            }
        ],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 799,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "mistral-mk-1-tactical-t-shirt-graphic-version-1",
        "formattedComparePrice": "",
        "formattedPrice": "₹799.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Mistral Mk.1 Tactical T-shirt (Graphic Version)",
        "media": [
            {
                "url": "63b1df_bf705a69447c4be5910ac03b5c8142d0~mv2.jpg",
                "index": 0,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "dharmo rakshti rakshitah black tshirt(web).jpg",
                "height": 3240
            },
            {
                "url": "63b1df_5b1c0e2a7b904bd98bbd3603d51586cf~mv2.jpg",
                "index": 1,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "dharmo rakshti rakshitah black tshirt(web).jpg",
                "height": 3240
            },
            {
                "url": "63b1df_80f5fb5f0cbb4bb1b8a29b557d0379d8~mv2.jpeg",
                "index": 2,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-16 at 7.05.15 PM.jpeg",
                "height": 1255
            },
            {
                "url": "63b1df_21f0abd4fb4d4c8fafc248494208ce7a~mv2.jpeg",
                "index": 3,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-16 at 7.05.15 PM(1).jpeg",
                "height": 1255
            },
            {
                "url": "63b1df_6bebeb82ac2a465092ff97522b3ec3a6~mv2.jpeg",
                "index": 4,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-16 at 7.05.17 PM.jpeg",
                "height": 1255
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "295ac1b2-d913-f801-b995-badfd2585e27",
        "options": [
            {
                "id": "57ce2812-2ef7-4b57-b0e4-a1a9818e2b90",
                "key": "Size (Inch)"
            },
            {
                "id": "opt-19",
                "key": "Color"
            }
        ],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 799,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "mistral-mk-1-tactical-t-shirt-graphic-version",
        "formattedComparePrice": "",
        "formattedPrice": "₹799.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Mistral Mk.1 Tactical T-shirt (Graphic Version)",
        "media": [
            {
                "url": "63b1df_0f99a20cc826497d927943f38b700fd7~mv2.jpg",
                "index": 0,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "dharmo rakshti rakshitah og tshirt(web).jpg",
                "height": 3240
            },
            {
                "url": "63b1df_4941c4d6fd044ed29cafb5dc04fbb6fb~mv2.jpg",
                "index": 1,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "dharmo rakshti rakshitah og tshirt(web).jpg",
                "height": 3240
            },
            {
                "url": "63b1df_9e30226fb047414cbb6311e70f47e689~mv2.jpeg",
                "index": 2,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-16 at 7.05.49 PM(1).jpeg",
                "height": 1245
            },
            {
                "url": "63b1df_8e024911a9d74e02b37d7af4d13c00d6~mv2.jpeg",
                "index": 3,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-16 at 7.05.50 PM.jpeg",
                "height": 1245
            },
            {
                "url": "63b1df_7e1aa3dcf4ea42499294f53c222dd49b~mv2.jpeg",
                "index": 4,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-16 at 7.05.50 PM(1).jpeg",
                "height": 1245
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "7ec76c00-83f0-4e07-3029-f8fb2e8692b2",
        "options": [],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 249,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "wah-bete-mauj-karadi-patch",
        "formattedComparePrice": "",
        "formattedPrice": "₹249.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Wah Bete Mauj Karadi Patch",
        "media": [
            {
                "url": "63b1df_840f4bdbf2954366bd9c0e8dd25f4294~mv2.jpeg",
                "index": 0,
                "width": 1600,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2023-09-02 at 11.00.58 PM.jpeg",
                "height": 1600
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "a22bc355-e4fd-6271-7695-ff29c9555626",
        "options": [
            {
                "id": "opt-19",
                "key": "Color"
            }
        ],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 649,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "recon-cap-patch-combo",
        "formattedComparePrice": "",
        "formattedPrice": "₹649.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Recon Cap + Patch Combo",
        "media": [
            {
                "url": "63b1df_9698ae9b35bf4696a1a750230c2c5311~mv2.jpg",
                "index": 0,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "PATCH + CAP  JPG.jpg",
                "height": 3240
            },
            {
                "url": "63b1df_de444d35b4a146cf8f88b87220fb1ae3~mv2.jpg",
                "index": 1,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "cap poster 1.jpg",
                "height": 3240
            },
            {
                "url": "63b1df_ccf5a5e415ff4fe89f100fa16a4dcb9f~mv2.jpg",
                "index": 2,
                "width": 1600,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "cap_1.jpg",
                "height": 1066
            },
            {
                "url": "63b1df_404be90ecaa544139d65626618c22aae~mv2.jpg",
                "index": 3,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "operator patch poster 1.jpg",
                "height": 3240
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "0584016f-41a7-3774-117d-ab3c3bb8bcfc",
        "options": [
            {
                "id": "opt-19",
                "key": "Color"
            },
            {
                "id": "57ce2812-2ef7-4b57-b0e4-a1a9818e2b90",
                "key": "Size (Inch)"
            }
        ],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 1349,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "intruder-package-zip-version-t-shirt",
        "formattedComparePrice": "",
        "formattedPrice": "₹1,349.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Intruder Package (Zip Version T-shirt)",
        "media": [
            {
                "url": "63b1df_575c1df731a04a0898c12d8a5682b661~mv2.jpg",
                "index": 0,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "tactical combo zip og jpg.jpg",
                "height": 3240
            },
            {
                "url": "63b1df_bb23392e8ffc4562bb516cf668eeff54~mv2.jpg",
                "index": 1,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "tactical combo zip black jpg.jpg",
                "height": 3240
            },
            {
                "url": "63b1df_dab7a99ed4c04cd7817d0ce67a241919~mv2.jpeg",
                "index": 2,
                "width": 1280,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "WhatsApp Image 2022-12-06 at 12.09.46 PM.jpeg",
                "height": 1245
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    },
    {
        "id": "3225bb14-1e1c-f882-5643-92755b277072",
        "options": [],
        "customTextFields": [],
        "productType": "physical",
        "ribbon": "New Arrival",
        "price": 249,
        "comparePrice": 0,
        "sku": "",
        "isInStock": true,
        "urlPart": "warthog-patch",
        "formattedComparePrice": "",
        "formattedPrice": "₹249.00",
        "pricePerUnit": null,
        "formattedPricePerUnit": null,
        "pricePerUnitData": null,
        "itemDiscount": null,
        "digitalProductFileItems": [],
        "name": "Warthog Patch",
        "media": [
            {
                "url": "63b1df_4207b4ff38b14d108fd8b5db3bdf7e42~mv2.jpg",
                "index": 0,
                "width": 3240,
                "mediaType": "PHOTO",
                "altText": null,
                "title": "warthog patch  jpg.jpg",
                "height": 3240
            }
        ],
        "isManageProductItems": false,
        "productItemsPreOrderAvailability": "no_variants",
        "isTrackingInventory": false,
        "inventory": {
            "status": "in_stock",
            "quantity": 0,
            "availableForPreOrder": false,
            "preOrderInfoView": {
                "limit": null
            }
        },
        "subscriptionPlans": {
            "list": []
        },
        "discount": {
            "mode": "PERCENT",
            "value": 0
        }
    }
]

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
    console.log(product_data)

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
                <button className="ctrl-button left" disabled={pagingIndex<=0} onClick={()=>{setPagingIndex(pagingIndex-1); scrollToCard(pagingIndex-1);}}><AiOutlineArrowLeft /></button>
                <div className="new-arrivals">
                    {
                        allNewArrivals.map((d, i)=>{
                            return <ProductCard spd={feedProductData} data={d} pushRef={pushRef} cardRef={cardRef} image={"media/image?image_path=upload/product/media/" + JSON.parse(d.media)[0].image_src} name={d.name} price={"₹" + d.price} isTex={true} url={"/product/" + d.name} key={i} index={i} pagingIndex={pagingIndex} />
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
                <div className="products">
                    {
                        allProduct.map((d, i)=>{
                            return <ProductSmallCard spd={feedProductData} data={d} image={"media/image?image_path=upload/product/media/" + JSON.parse(d.media)[0].image_src} name={d.name} price={"₹" + d.price} isTex={true} url={"/product/" + d.name} key={i}/>
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