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

    await fetch("http://localhost:1000/product/remove_from_cart", requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));

    return res;
};

export async function addProductToCart(email, p_id, q) {
    var res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "product_id": p_id,
        "quantity": q
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    await fetch("http://localhost:1000/product/add_to_cart", requestOptions)
        .then((response) => response.json())
        .then((result) => res = result)
        .catch((error) => console.error(error));
    return res;
};