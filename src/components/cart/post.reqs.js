import url_main from "../../functions/url";

export async function removeProductFromCart(email, p_id) {
    var res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "product_id": p_id
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch(url_main + "product/remove_from_cart", requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};

export async function addProductToCart(email, p_id, q, s, c, pp) {
    var res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "product_id": p_id,
        "quantity": q,
        "size": s,
        "color": c,
        "product_price": pp
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch(url_main + "product/add_to_cart", requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));
    return res;
};