import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../asyncMethod/asyncAction";
import {SET_CARD_PRODUCT, DECREMENT_QNTY, INCREMENT_QNTY} from "../store/ProductReducer";

const Product = () => {
    const [product, setProduct] = useState([{}]);
    const [qnty, setQnty] = useState(1);
    const dispatch = useDispatch();
    const { SelectedProduct } = useSelector(state => state.ProductReducer);
    console.log(SelectedProduct[0]);
    const { id } = useParams();
    const addProduct = () => {
        const { _id, photo, p_name, actual_price, discount_price } = product;
        dispatch({ type: SET_CARD_PRODUCT, paylood: { id: _id, photo, p_name, actual_price: actual_price*qnty, discount_price: discount_price*qnty, quantity: qnty } });
        console.log("runnn")
    }
    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [id]);
    useEffect(() => {
        setProduct(SelectedProduct[0]);
    }, [SelectedProduct])
    return (
        <div className="container">
            {product ? <div className="row my-5">
                <div className="col-sm-6">
                    <img src={`/ProductImages/${product.photo}`} width="100%" height="100%" alt="..." />
                </div>
                <div className="col-sm-6">
                    <h3>{product.p_name}</h3>
                    <p className="lead">
                        <span>${product.discount_price}</span>
                    </p>
                    <p>
                        <span className="text-decoration-line-through">${product.actual_price}</span>
                    </p>
                    <p>
                        <button className="btn btn-light" onClick={() => setQnty(qnty + 1)}>+</button>
                        {qnty}
                        <button className="btn btn-light" onClick={() => qnty > 1 ? setQnty(qnty-1) : setQnty(qnty)}>-</button>
                    </p>
                    <button className="btn btn-danger" onClick={() => addProduct()}>Add to Card</button>
                </div>
            </div> : ""}
        </div>

    )
}
export default Product;