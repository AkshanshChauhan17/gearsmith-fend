export default async function authPostRequest(url, email, password) {
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

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