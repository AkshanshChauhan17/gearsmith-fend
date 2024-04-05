import $ from "jquery";
import url_main from "./url";

export async function getRequest(url) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const res = await fetch(url_main + url, requestOptions)
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

export async function getRequestStream(url) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const res = await fetch(url_main + url, requestOptions)
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};