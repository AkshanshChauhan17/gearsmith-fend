import $ from "jquery";

var url_prefix = "http://localhost:1000/"

export async function getRequest(url) {
    var res;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    await fetch(url_prefix + url, requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};