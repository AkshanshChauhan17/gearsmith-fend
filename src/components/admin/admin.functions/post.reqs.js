import { getRequest } from "../../../functions/get.req";
import url_main from "../../../functions/url";

const postNewProduct = async(name, price, image_list, color_list, size_list, product_summary, sizes, detail, disclaimer) => {
    var res = null;
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("size_list", JSON.stringify(size_list));
    formdata.append("media", "");
    formdata.append("color_list", JSON.stringify(color_list));
    image_list.forEach((file, index) => {
        formdata.append(`imageFiles`, file, `product_image_${index}.jpg`);
    });
    formdata.append("product_summary", product_summary);
    formdata.append("size_table", JSON.stringify(sizes));
    formdata.append("detail", detail);
    formdata.append("disclaimer", disclaimer);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
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