const initialState = {
    product_data: null,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCT_DATA':
            return {
                ...state,
                product_data: action.product_data
            }
        default:
            return state;
    }
};

export default productReducer;