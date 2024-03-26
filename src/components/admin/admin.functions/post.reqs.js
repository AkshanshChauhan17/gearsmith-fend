import { getRequest } from "../../../functions/get.req";

const postNewProduct = async(name, price, media, color_list, size_list, product_summary) => {
    var res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        name: name,
        price: price,
        media: media,
        color_list,
        size_list,
        product_summary: product_summary
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch("http://localhost:1000/product/add_product", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(res)
            res = result
        })
        .catch((error) => console.error(error));

    return res;
};

export default postNewProduct;