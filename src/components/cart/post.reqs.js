export async function removeProductFromCart() {
    const res = null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "user_id": u_id,
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