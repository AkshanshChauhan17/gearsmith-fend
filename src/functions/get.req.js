import $ from "jquery";
import url_main from "./url";

export async function getRequest(url) {
    var res;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    await fetch(url_main + url, requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};