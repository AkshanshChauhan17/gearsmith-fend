import { getRequest } from "../../../functions/get.req";
import url_main from "../../../functions/url";

const postNewProduct = async(name, price, media, color_list, size_list, product_summary, sizes, detail, disclaimer) => {
    var res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        name: name,
        price: price,
        media: media,
        color_list,
        size_list,
        product_summary: product_summary,
        size_table: sizes,
        detail: detail,
        disclaimer: disclaimer
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch(url_main + "product/add_product", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(res)
            res = result
        })
        .catch((error) => console.error(error));

    return res;
};

export default postNewProduct;