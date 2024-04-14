import url_main from "../../functions/url";

export async function postRating(user_email, user_image, product_id, rating, comment) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Uo-T-f-0-0", localStorage.token);

    const raw = JSON.stringify({
        "user_email": user_email,
        "product_id": product_id,
        "comment": comment,
        "rating": rating,
        "image": user_image
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const res = await fetch(url_main + "product/rate", requestOptions);
    return res.json();
};

export async function removeRating(user_email, product_id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Uo-T-f-0-0", localStorage.token);

    const raw = JSON.stringify({
        "user_email": user_email,
        "product_id": product_id
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const res = await fetch(url_main + "product/rate", requestOptions);
    return res.json();
};