export default async function verifyToken() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token") != undefined && localStorage.getItem("token"));

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const vt_res = await fetch("http://localhost:1000/user/token/profile", requestOptions)
        const vt_res_json = await vt_res.json()
        return Promise.resolve(vt_res_json);
    } catch (error) {
        return Promise.reject(error);
    };
};