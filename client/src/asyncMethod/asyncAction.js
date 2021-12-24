import axios from 'axios';
import toast from 'react-hot-toast';
import { SET_PRODUTS, SET_SELECTED_PRODUCT } from '../store/ProductReducer';

export const addProduct = async (values) => {
    const formData = new FormData();
    formData.append('p_photo', values.p_photo);
    formData.append('p_name', values.p_name);
    formData.append('actual_price', values.actual_price);
    formData.append('discount_price', values.discount_price);
    formData.append('catagari', values.catagari);
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await axios.post("/add_product", formData, config);
        //console.log(response);
        const { msg } = response.data;
        toast.success(msg);
    } catch (error) {
        //console.log(error.response);
        const { msg } = error.response.data;
        toast.error(msg);
    }
}

export const fetchProducts = (page) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/fetch_products/${page}`);
            // console.log(response);
            const { count, parPage, products } = response.data;
            // const postsData = response.data.response;
            dispatch({ type: SET_PRODUTS, paylood: { products, count, parPage } });
        } catch (err) {
            console.log(err.response);
        }
    }
}

export const fetchProduct = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/fetch_product/${id}`);
            // console.log(response);
            const { product } = response.data;
            // const postsData = response.data.response;
            dispatch({ type: SET_SELECTED_PRODUCT, paylood: product });
        } catch (err) {
            console.log(err.response);
        }
    }
}

export const userEmail = async(email) => {
    // const config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // };
    try {
        console.log("yes1")
        const response = await axios.get(`/user_email/${email}`);
        //console.log(response);
        const { msg } = response.data;
        toast.success(msg);
    } catch (err) {
        console.log(err.response);
    }
}