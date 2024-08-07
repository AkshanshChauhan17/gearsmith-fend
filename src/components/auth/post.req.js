export default async function authPostRequest(url, data) {
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("meta", JSON.stringify(data.meta));
    formdata.append("image", data.image, data.image.name);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    try {
        const response = await fetch(url, requestOptions);
        const result_1 = await response.json();
        return await Promise.resolve(result_1);
    } catch (error) {
        return await Promise.reject(error);
    }
}