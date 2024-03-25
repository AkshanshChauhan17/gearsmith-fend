import { getRequest } from "../../../functions/get.req";

export const postNewProduct = async(name, price, media, color_list, size_list, product_summary) => {
    var res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        name: name,
        price: price,
        media: [],
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
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};

export const fetchProductImageWithMedia = (product_id) => {
    var res = null;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        product_id: product_id
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:1000/product/fetch_media_into_product/", requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};

export const uploadProductImage = async(product_name, fileInput, image_path) => {
    var res = null;
    var product_id;

    var formdata = new FormData();
    formdata.append("image", fileInput, image_path);
    formdata.append("product_name", product_name);

    await getRequest("product/" + product_name)
        .then((product) => {
            product_id = product.product_id;
            formdata.append("product_id", product.product_id);
        })
        .then(err => console.error(err));

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };

    await fetch("http://localhost:1000/product/add_product_image", requestOptions)
        .then((response) => response.json())
        .then((result) => res = 0)
        .catch((error) => console.error(error));

    await fetchProductImageWithMedia(product_id)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};