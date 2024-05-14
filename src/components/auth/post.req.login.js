export default async function authPostLoginRequest(url, data) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data)

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
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