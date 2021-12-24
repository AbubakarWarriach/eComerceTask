export const SET_PRODUTS = "SET_PRODUTS";
export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
export const SET_CARD_PRODUCT = "SET_CARD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const INCREMENT_QNTY = "INCREMENT_QNTY";
export const DECREMENT_QNTY = "DECREMENT_QNTY";

const initState = {
    SelectedProduct: [],
    cardProduct: [],
    products: [],
    count: '',
    parPage: '',
    product_qnty: 1,
};

const ProductReducer = ((state = initState, action) => {
    switch (action.type) {
        case SET_PRODUTS:
            const { count, parPage, products } = action.paylood;
            return { ...state, products: products, count: count, parPage: parPage };
        case SET_SELECTED_PRODUCT:
            return { ...state, SelectedProduct: action.paylood };
        case SET_CARD_PRODUCT:
            return { ...state, cardProduct: [...state.cardProduct, action.paylood] };
        case REMOVE_PRODUCT:
            const product = state.cardProduct.filter((v) => v.id !== action.paylood);
            return { ...state, cardProduct: product };
        default:
            return state;
    }
});
export default ProductReducer;