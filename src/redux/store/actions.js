export const setProductData = (data) => ({
    type: "SET_PRODUCT_DATA",
    product_data: data,
});

export const setLoginStatus = (bool) => ({
    type: "LOGIN_STATUS",
    login_status: bool,
});